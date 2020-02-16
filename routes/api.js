let express = require('express');
let router = express.Router();

router.route('/universities/:domain')
	.post(function (req, res) {
        if (req.app.session.domain !== req.params.domain) {
            res.json({ok: false, error: "You can't change the details of another school's domain."});
            return;
        }
        
		createUniversity(req.app.session.domain, req.body.name, function(err, result) {
            if (err) {
                res.json({ok: false, error: err});
                return;
            }
            res.json({ok: true});
        });
	});

router.route('/universities/:domain/chats/:chatId');

module.exports = router;
