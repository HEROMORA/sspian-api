const deadlineCount = (deadlines) => {
  let assignment = 0;
  let quiz = 0;
  let project = 0;

  for (let i = 0; i < deadlines.length; i++) {
    switch (deadlines[i].type) {
      case 'quiz':
        quiz++;
        break;
      case 'assignment':
        assignment++;
        break;
      case 'project':
        project++;
        break;
    }
  }

  return {
    totalCount: deadlines.length,
    assignment,
    quiz,
    project,
  };
};

module.exports = deadlineCount;
