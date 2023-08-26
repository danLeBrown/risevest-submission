import request from 'supertest';
import { Express } from 'express';
import createApplication from '../utils/app';
import { CommentsService } from '../domains/comments/comments.service';
import { User } from '../domains/users/entity/user.entity';
import { UsersService } from '../domains/users/users.service';
import { PostsService } from '../domains/posts/posts.service';
import { Post } from '../domains/posts/entity/post.entity';

describe('Posts Controller', () => {
  let app: Express;
  let user: User;
  let postsService: PostsService;
  let usersService: UsersService;
  let commentsService: CommentsService;
  let post: Post;
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

    post = await postsService.create({
      user_id: user.id,
      title: 'Hello world',
      content: 'Lorem ipsum dolor sit amet',
    });
  });

  describe('GET /posts', () => {
    it('should throw a 401 error if no token is provided', (done) => {
      request(app)
        .get('/posts')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });

    it('should return an array of posts', (done) => {
      request(app)
        .get('/posts?user_id=1')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data).toHaveLength(1);

          done();
        });
    });

    it('should return a single post', (done) => {
      request(app)
        .get(`/posts/${post.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBe(post.id);

          done();
        });
    });
  });

  describe('POST /posts', () => {
    it('should create a post', (done) => {
      request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id,
          title: 'New post',
          content: 'Lorem ipsum dolor sit amet',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBeDefined();

          postsService.findBy().then((posts) => {
            expect(posts).toHaveLength(2);
          });

          done();
        });
    });
  });

  describe('POST /posts/:id/comment', () => {
    let newUser: User;
    beforeAll(async () => {
      newUser = await usersService.create({
        name: 'Jane Doe',
      });
    });

    it('should add a comment to a post', (done) => {
      request(app)
        .post(`/posts/${post.id}/comments`)
        .set('Authorization', `Bearer ${newUser.token}`)
        .send({
          user_id: newUser.id,
          post_id: post.id,
          content: 'New comment',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBeDefined();

          commentsService
            .findBy({ post_id: res.body.data.id })
            .then((comments) => {
              expect(comments).toHaveLength(1);
            });

          done();
        });
    });
  });
});
