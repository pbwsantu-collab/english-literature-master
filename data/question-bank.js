window.QUESTION_BANK = (function () {
  const lessons = [
    window.LESSON_GARDEN_PARTY,
    window.LESSON_ALIAS_JIMMY,
    window.LESSON_NOBEL,
    window.LESSON_STILL_I_RISE,
    window.LESSON_MY_LAST_DUCHESS
  ].filter(Boolean);

  function collect() {
    const bank = [];
    lessons.forEach((lesson) => {
      (lesson.mcqs || []).forEach((q, i) => {
        bank.push({
          id: `${lesson.id}-mcq-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'mcq',
          difficulty: q.diff || 'medium',
          marks: 1,
          question: q.q,
          options: q.options,
          answer: q.options[q.ans],
          answerIndex: q.ans
        });
      });
      (lesson.saqs || []).forEach((q, i) => {
        bank.push({
          id: `${lesson.id}-saq-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'saq',
          difficulty: q.diff || 'medium',
          marks: q.marks || 2,
          question: q.q,
          answer: q.ans
        });
      });
      (lesson.broad || []).forEach((q, i) => {
        bank.push({
          id: `${lesson.id}-broad-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'broad',
          difficulty: q.diff || 'hard',
          marks: q.marks || 5,
          question: q.q,
          answer: q.ans
        });
      });
      (lesson.trueFalse || []).forEach((q, i) => {
        bank.push({
          id: `${lesson.id}-tf-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'truefalse',
          difficulty: 'easy',
          marks: 1,
          question: q.q,
          answer: q.ans ? 'True' : 'False',
          answerBool: q.ans
        });
      });
      (lesson.fillBlanks || []).forEach((q, i) => {
        bank.push({
          id: `${lesson.id}-fib-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'fill',
          difficulty: 'easy',
          marks: 1,
          question: q.q,
          answer: q.ans
        });
      });
      (lesson.vocabulary || []).forEach((v, i) => {
        bank.push({
          id: `${lesson.id}-vocab-${i}`,
          lesson: lesson.id,
          lessonTitle: lesson.title,
          type: 'vocabulary',
          difficulty: 'easy',
          marks: 1,
          question: `What is the meaning of "${v.word}"?`,
          answer: `${v.simple} (বাংলা: ${v.bn})`,
          word: v.word,
          bn: v.bn,
          simple: v.simple
        });
      });
    });
    return bank;
  }

  return {
    lessons,
    getAll: collect,
    getByLesson: (ids) => collect().filter((q) => ids.includes(q.lesson)),
    getByType: (types) => collect().filter((q) => types.includes(q.type)),
    getMeta: () => lessons.map((l) => ({
      id: l.id,
      title: l.title,
      author: l.author,
      genre: l.genre,
      icon: l.icon,
      color: l.color,
      shortDesc: l.shortDesc,
      mcqCount: (l.mcqs || []).length,
      saqCount: (l.saqs || []).length,
      broadCount: (l.broad || []).length,
      vocabCount: (l.vocabulary || []).length
    }))
  };
})();
