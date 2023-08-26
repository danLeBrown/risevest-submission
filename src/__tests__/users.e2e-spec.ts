import request from 'supertest';
import { Express } from 'express';
import createApplication from '../utils/app';
import { CommentsService } from '../domains/comments/comments.service';
import { User } from '../domains/users/entity/user.entity';
import { UsersService } from '../domains/users/users.service';
import { PostsService } from '../domains/posts/posts.service';
import { CreatePostDto } from '../domains/posts/dto/create-post.dto';
import { CreateCommentDto } from '../domains/comments/dto/create-comment.dto';

describe('Users Controller', () => {
  let app: Express;
  let user: User;
  let usersService: UsersService;
  let postsService: PostsService;
  let commentsService: CommentsService;
  let token: string;

  beforeAll(async () => {
    app = await createApplication();
    commentsService = new CommentsService();
    usersService = new UsersService();
    postsService = new PostsService();

    user = await usersService.create({
      name: 'John Doe',
    });
    token = user.token ?? '';
  });

  describe('POST /users', () => {
    it('should throw a 401 error if no token is provided', (done) => {
      request(app)
        .post('/users')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });

    it('should create a user', (done) => {
      request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Jane Doe',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.user).toBeDefined();
          expect(res.body.data.user).toHaveProperty('id');
          expect(res.body.data.user).toHaveProperty('name');
          expect(res.body.data).toHaveProperty('token');

          usersService.findBy().then((users) => {
            expect(users).toHaveLength(2);
          });

          done();
        });
    });
  });

  describe('POST /users/:id/post', () => {
    it('should create a post for a user and retrieve all posts of a user', (done) => {
      request(app)
        .post('/users/1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id,
          title: 'Hello world',
          content: 'Lorem ipsum dolor sit amet',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data).toHaveLength(1);

          postsService.findBy({ user_id: user.id }).then((posts) => {
            expect(posts).toHaveLength(1);
          });

          done();
        });
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', (done) => {
      request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data).toHaveLength(2);

          done();
        });
    });

    it('should return a single user', (done) => {
      request(app)
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBe(user.id);

          done();
        });
    });
  });

  describe('GET /users/top', () => {
    beforeAll(async () => {
      const topUser = await usersService.create({
        name: 'Top User',
      });
      const secondUser = await usersService.create({
        name: 'Second User',
      });
      const thirdUser = await usersService.create({
        name: 'Third User',
      });
      const fourthUser = await usersService.create({
        name: 'Fourth User',
      });

      const topUserCreatePostDto: CreatePostDto[] = [
        {
          user_id: topUser.id,
          title: 'Top User Post 1',
          content: 'Top User Post 1',
        },
        {
          user_id: topUser.id,
          title: 'Top User Post 2',
          content: 'Top User Post 2',
        },
        {
          user_id: topUser.id,
          title: 'Top User Post 3',
          content: 'Top User Post 3',
        },
        {
          user_id: topUser.id,
          title: 'Top User Post 4',
          content: 'Top User Post 4',
        },
      ];

      const posts = await Promise.all(
        topUserCreatePostDto.map((createPostDto) =>
          postsService.create(createPostDto),
        ),
      );

      const topUserCreateCommentDto: CreateCommentDto[] = [
        {
          user_id: topUser.id,
          post_id: posts[0].id,
          content: 'Top User Comment 1',
        },
        {
          user_id: topUser.id,
          post_id: posts[1].id,
          content: 'Top User Comment 2',
        },
      ];

      await Promise.all(
        topUserCreateCommentDto.map((createCommentDto) =>
          commentsService.create(createCommentDto),
        ),
      );
    });
    it('should fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. ', (done) => {
      request(app)
        .get(`/users/leader-board`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0].name).toBe('Top User');
          expect(res.body.data[0].latest_comment).toBe('Top User Comment 2');
          expect(res.body.data[0].total_posts).toBe(4);

          done();
        });
    });
  });
});
