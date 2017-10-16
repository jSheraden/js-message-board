import express        from 'express';
import session        from 'express-session';
import path           from 'path';
import favicon        from 'serve-favicon';
import logger         from 'morgan';
import cookieParser   from 'cookie-parser';
import bodyParser     from 'body-parser';

import passportConfig from './passport-config';
import routes         from './routes/index';
import posts          from './routes/posts';
import users          from './routes/users';
import threads        from './routes/threads';
import forums         from './routes/forums';
import categories     from './routes/categories';

const app = new express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app
  .use(passportConfig.initialize())
  .use(passportConfig.session())
  .use('/', routes)
  .use('/posts', posts)
  .use('/users', users)
  .use('/threads', threads)
  .use('/forums', forums)
  .use('/categories', categories);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


export default app;
