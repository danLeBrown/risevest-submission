import request from 'supertest';
import { Express } from 'express';
import createApplication from '../utils/app';
import { CommentsService } from '../domains/comments/comments.service';
import { User } from '../domains/users/entity/user.entity';
import { Comment } from '../domains/comments/entity/comment.entity';
import { UsersService } from '../domains/users/users.service';
import { PostsService } from '../domains/posts/posts.service';

describe('Comments Controller', () => {
  let app: Express;
  let user: User;
  let commentsService: CommentsService;
  let comment: Comment;

  beforeAll(async () => {
    app = await createApplication();
    commentsService = new CommentsService();
    const usersService = new UsersService();
    const postsService = new PostsService();

    user = await usersService.create({
      name: 'John Doe',
    });

    const post = await postsService.create({
      user_id: user.id,
      title: 'Hello world',
      content: 'Lorem ipsum dolor sit amet',
    });

    comment = await commentsService.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Hello world',
    });
  });

  describe('GET /comments', () => {
    it('should return an array of comments', (done) => {
      request(app)
        .get('/comments')
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

    it('should return a single comment', (done) => {
      request(app)
        .get(`/comments/${comment.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBe(comment.id);

          done();
        });
    });
  });

  describe('POST /comments', () => {
    it('should create a comment', (done) => {
      request(app)
        .post('/comments')
        .send({
          user_id: user.id,
          post_id: comment.post_id,
          content: 'New comment',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.body.data.id).toBeDefined();

          commentsService.findBy().then((comments) => {
            expect(comments).toHaveLength(2);
          });

          done();
        });
    });
  });
});
