const router = require('express').Router({ mergeParams: true });

const { createMessage , deleteMessage , getMessage } = require("../handlers/messages");

router.route("/").post(createMessage);
router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;