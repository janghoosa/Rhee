var express = require('express');
var app = express();
const cors = require('cors');
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
//const body = require('body-parser');
const PORT = process.env.PORT || 3001;
const db = require('./config/db');
// const { response, urlencoded } = require('express');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(cors({ credentials: true, origin: true }));
app.set('trust proxy', true);
app.use(session({
    secret: 'rhee123',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'rhee'
    }),
    cookie: {
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log("Call SerializeUser");
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    console.log("Call DeserializeUser");
    done(null, id);
})

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:3001/auth/google/callback"
    //passReqToCallback: true,
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile);
        return done(null, profile);
    }
))

app.get('/auth/google', function (req, res, next) {
    console.log("Get google");
    passport.authenticate('google', { scope: ['profile'] }, function (err, user, info) {
    })(req, res, next);
    // console.log(res);
});

app.get('/auth/google/callback', (req, res, next) => {
    console.log("Get Auth");
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/fail',
    })(req, res, next);
});

app.get('/auth/google/success/', (req, res, next) => {
    console.log("Login Success: " + req.user);
    db.query(`SELECT * FROM user WHERE google_id = ?`, [req.user], (error, result) => {
        if (error) {
            throw error;
        }
        else if (result.length === 0) {
            res.redirect("http://localhost:3000/Rhee/googlesign");
        } else {
            req.session.user_id = result[0].user_id;
            req.session.nickname = result[0].nickname;
            req.session.save(function () {
                console.log(req.session.nickname);
                res.redirect("http://localhost:3000/Rhee/");
            })
        }
    });
    // res.redirect("http://localhost:3000/Rhee/sign");
});

app.get('/auth/google/fail/', (req, res, next) => {
    console.log("Login Failed");
    res.redirect("http://localhost:3000/Rhee/login");
});

app.get('/', (req, res) => {
    if (req.user != null) {
        console.log(req.user);
    }
    req.session.save(function () {
        // console.log(req.session);
        if (req.session.nickname != null) {
            console.log('nickname:' + req.session.nickname);
            res.send(req.session.nickname);
        } else {
            res.sendStatus(204);
        }
    });
    //res.send("/");
});

app.get('/data', (req, res) => {
    console.log("Get Data");
    req.session.save(function () {
        db.query(`SELECT board_id,title,date,nickname FROM board b , user u WHERE b.writer=u.user_id ORDER BY date DESC`, function (error, result) {
            if (error) {
                throw error;
            }
            res.send(result);
        });
    });
});

app.get('/detail/:id', (req, res) => {
    console.log("Get Data:id");
    db.query(`SELECT board_id, title, content, date, nickname FROM board b, user u WHERE board_id=? and b.writer=u.user_id`, [req.params.id], function (error, result) {
        if (error) {
            throw error;
        }
        res.send(result);
        res.end();
    });
});

app.post('/data/board/assign', (req, res) => {
    const d = {
        board_id: req.body.board_id
    }
    db.query(`SELECT * FROM board b, user u WHERE b.writer=u.user_id and board_id=? and writer=?`,
        [d.board_id, req.session.user_id], function (error, result) {
            if (error) {
                throw error;
            }
            if (result.length > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(204);
            }
        })
})

app.post('/', (req, res) => {
    console.log("Post /");
    res.send(req.body);
});

app.post('/data/board', (req, res) => {
    console.log("Post Board");
    const d = {
        title: req.body.title,
        content: req.body.content
    }
    console.log(d);
    console.log(req.session);
    if (req.session.user_id != null) {
        console.log("db insert");
        db.query(`INSERT INTO board(writer, title, content) VALUES (?,?,?)`, [req.session.user_id, d.title, d.content], function (error, result) {
            if (error) {
                throw error;
            }
            res.sendStatus(200);
            return;
        })
    }
});

app.post('/data/board/update', (req, res) => {
    console.log("Update Board");
    const d = {
        title: req.body.title,
        content: req.body.content,
        board_id: req.body.board_id
    }
    if (req.session.user_id != null) {
        db.query(`UPDATE board SET title=?, content=? WHERE board_id=?`, [d.title, d.content, d.board_id], function (error, result) {
            if (error) {
                throw error;
            }
            res.sendStatus(200);
            return;
        })
    }
});

app.post('/data/board/delete', (req, res) => {
    const d = {
        board_id: req.body.board_id
    }
    console.log("Delete Data");
    console.log(req.session.user_id, d.board_id);
    db.query(`DELETE FROM board WHERE writer = ? and board_id = ?`, [req.session.user_id, d.board_id], function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result.affectedRows);
        if (result.affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
        // res.writeHead(302, {Location:`/data/${res.insertId}`});
    })

}); ``

app.post('/signup', (req, res) => {
    console.log("Post SignUp");
    const d = {
        id: req.body.id,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        birth: req.body.birth,
        sex: req.body.sex
    }
    console.log(d);
    db.query(`INSERT INTO user(user_id, password, f_name, l_name, nickname, birth_date, sex) VALUES (?,?,?,?,?,?,?)`, [d.id, d.password, d.firstname, d.lastname, d.nickname, d.birth, d.sex], function (error, result) {
        if (error) {
            throw error;
        }
    })
    res.send(d);
});

app.post('/signin', (req, res) => {
    console.log("Post Singin");
    const d = {
        id: req.body.id,
        password: req.body.password,
    }
    console.log(d);
    db.query(`SELECT user_id, f_name, l_name, nickname FROM user WHERE user_id=? and password=?`, [d.id, d.password], function (error, result) {
        if (error) {
            res.sendStatus(204);
            throw error;
        }
        if (result.length === 0) {
            res.sendStatus(204);
        } else {
            req.session.user_id = result[0].user_id;
            req.session.nickname = result[0].nickname;
            req.session.save(function () {
                console.log(req.session.nickname);
                res.send(req.session.nickname);
            })
        }
    })
});

app.get('/logout', (req, res) => {
    console.log("post logout");
    delete req.session.nickname;
    delete req.session.user_id;
    delete req.user;
    req.logout();
    req.session.save(() => {
        res.redirect("/");
    });
});

app.post('/search/hash', (req, res) => {
    console.log("Search Hashtag");
    const d = {
        searchTerm: req.body.searchTerm
    }
    db.query(`SELECT board_id,title,date, nickname FROM board b, hashtag h WHERE b.board_id=h.board_id and tag=? ORDER BY date DESC`,
        [d.searchTerm], function (error, result) {
            if (error) {
                throw error;
            }
            res.send(result);
        });
});

app.post('/search/content', (req, res) => {
    console.log("Post content");
    const d = {
        searchTerm: req.body.searchTerm
    }
    var content = "%" + d.searchTerm + "%"

    db.query(`SELECT board_id,title,date,nickname FROM board b , user u WHERE (content LIKE ? or title LIKE ?) and b.writer = u.user_id ORDER BY date DESC`, [content, content], function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result);
        res.send(result);
        //console.log(topics);
    });
});

app.post('/search/writer', (req, res) => {
    console.log("Post writer");
    const d = {
        searchTerm: req.body.searchTerm
    }
    var content = "%" + d.searchTerm + "%"

    db.query(`SELECT board_id,title,date,nickname FROM board b , user u WHERE nickname LIKE ? and b.writer = u.user_id ORDER BY date DESC`, [content], function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result);
        res.send(result);
        //console.log(topics);
    });
});

app.post('/data/reply/add', (req, res) => {
    console.log("Add Reply");
    const d = {
        board_id: req.body.board_id,
        reply: req.body.reply,
        parent_id: req.body.parent_id
    }
    console.log(d);
    db.query(`INSERT INTO comment(board, writer, content, parent_id) VALUES (?,?,?,?)`, [d.board_id, req.session.user_id, d.reply, d.parent_id], function (error, result) {
        if (error) {
            throw error;
        }
        // console.log(result);

        res.send(result);
        //console.log(topics);
    });
});

app.post('/data/reply/delete', (req, res) => {
    const d = {
        comment_id: req.body.comment_id
    }
    console.log(d);
    db.query(`DELETE FROM comment WHERE comment_id=? and writer=?`, [d.comment_id, req.session.user_id], function (error, result) {
        if (error) {
            throw error;
        }
        if (result.affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
    })
})

app.get('/data/reply/:id', (req, res) => {
    console.log("Get Reply");
    var final_result = {
        count: [],
        result: []
    };
    db.query(`SELECT comment_id, board, parent_id, nickname, content FROM user u , comment c WHERE u.user_id = c.writer and c.board = ? ORDER BY parent_id`, [req.params.id], function (error, result) {
        if (error) {
            throw error;
        }
        final_result.result.push(result);
        console.log(final_result);
        db.query(`SELECT parent_id, count(comment_id) from comment group by parent_id order by parent_id`, function (error, result2) {
            if (error) {
                throw error;
            }
            console.log("된다")
            final_result.count.push(result2);
            console.log(final_result);
            res.send(final_result);
        })
    })
})

app.get('/data/reply/reply/:id', (req, res) => {
    console.log("Get reply/reply")
    db.query(`SELECT comment_id, board, parent_id, nickname, content FROM user u , comment c WHERE u.user_id = c.writer and c.board = ? and c.parent_id IS NULL ORDER BY comment_id`, [req.params.id], function (error, result) {
        if (error) {
            throw error;
        }
        var arrComment = JSON.parse(JSON.stringify(result));

        db.query(`SELECT comment_id, board, parent_id, nickname, content FROM user u , comment c WHERE u.user_id = c.writer and c.board = ? and c.parent_id IS NOT NULL ORDER BY comment_id`, [req.params.id], function (error, result2) {
            if (error) {
                throw error;
            }
            var arrReply = JSON.parse(JSON.stringify(result2))

            var arrResult = new Array();

            arrComment.forEach(comment => {
                arrResult.push(comment);
                arrReply.forEach(reply => {
                    if (comment.comment_id === reply.parent_id) {
                        arrResult.push(reply);
                    }
                });
            });
            res.send(arrResult);
        })
    })
})

app.post('/signup/google', (req, res) => {
    console.log("Post Google SignUp");
    console.log(req.user);
    const d = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        birth: req.body.birth,
        sex: req.body.sex
    }
    console.log(d);
    db.query(`INSERT INTO user(user_id, password, f_name, l_name, nickname, birth_date, sex, google_id) VALUES (?,?,?,?,?,?,?,?)`, [req.user, '0000' ,d.firstname, d.lastname, d.nickname, d.birth, d.sex, req.user], function (error, result) {
        if (error) {
            throw error;
        }
    })
    res.send(d);
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});