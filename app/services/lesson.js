const Lesson = require("../models/lesson");
const fileManager = require("../managers/file");
const { Response, ResponseStatus } = require("../models/response");

const lessonsPath = "data/lessons.json";

const list = () => {
  const lessons = fileManager.getFile(lessonsPath);
  return new Response(ResponseStatus.SUCCESS, lessons);
};

const get = (id) => {
  const lessons = fileManager.getFile(lessonsPath);

  const lesson = lessons.filter((lesson) => lesson.id === Number(id))[0];

  if (lesson) {
    return new Response(ResponseStatus.SUCCESS, lesson);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Lesson not found");
  }
};

const del = (id) => {
  const lessons = fileManager.getFile(lessonsPath);

  const index = lessons.findIndex((lesson) => lesson.id === id);

  if (index > -1) {
    lessons.splice(index, 1);
    fileManager.saveFile(lessonsPath, lessons);

    return new Response(ResponseStatus.SUCCESS, null);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Lesson not found");
  }
};

const save = (data) => {
  const lessons = fileManager.getFile(lessonsPath);

  const lesson = Lesson.create(data);

  if (lesson instanceof lesson) {
    lessons.push(lesson);
    fileManager.saveFile(lessonsPath, lessons);

    return new Response(ResponseStatus.CREATED, lesson);
  } else {
    return new Response(
      ResponseStatus.BAD_REQUEST,
      lesson,
      "Invalid lesson data"
    );
  }
};

module.exports = {
  list,
  get,
  del,
  save,
};
