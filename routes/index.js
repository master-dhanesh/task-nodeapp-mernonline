var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

let LOCAL_DB = [
    {
        id: "asyuw-37yasd-ejk64-47ddwe",
        deadline: "November 12, 2022 : 12:54:10",
        title: "SIRT VAC Workshop",
        desc: "10 days SIRT WEB workshop in SIRTE college Bhopal",
    },
];

router.get("/", function (req, res, next) {
    res.render("show", { tasks: LOCAL_DB });
});

router.get("/create", function (req, res, next) {
    res.render("create");
});

router.post("/create", function (req, res, next) {
    const newTask = {
        id: uuidv4(),
        deadline:
            new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }) +
            " : " +
            new Date().toLocaleTimeString(),
        title: req.body.title,
        desc: req.body.desc,
    };

    LOCAL_DB.push(newTask);
    res.redirect("/");
});

router.get("/delete/:id", function (req, res, next) {
    const id = req.params.id;
    const taskIndex = LOCAL_DB.findIndex((task) => {
        return id === task.id;
    });
    LOCAL_DB.splice(taskIndex, 1);
    res.redirect("/");
});

router.get("/update/:id", function (req, res, next) {
    const id = req.params.id;
    const TaskIndex = LOCAL_DB.findIndex((t) => t.id === id);
    res.render("update", { task: LOCAL_DB[TaskIndex] });
});

router.post("/update/:id", function (req, res, next) {
    const id = req.params.id;
    const TaskIndex = LOCAL_DB.findIndex((t) => t.id === id);
    LOCAL_DB[TaskIndex] = { ...LOCAL_DB[TaskIndex], ...req.body };
    res.redirect("/");
});
module.exports = router;
