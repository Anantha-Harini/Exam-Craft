function generatePaper(questions, difficulty, examtype){

  const difficultyPattern = {
    Easy:   {easy:0.7, medium:0.2, hard:0.1},
    Medium: {easy:0.4, medium:0.4, hard:0.2},
    Hard:   {easy:0.2, medium:0.3, hard:0.5}
  };

  const templates = {
  Assessment: [
    {marks:"2",count:5},
    {marks:"8",count:3},
    {marks:"16",count:1}
  ],
  Endsem: [
    {marks:"2",count:10},
    {marks:"13",count:5},
    {marks:"15",count:1}
  ]
};

const template = templates[examtype];

if(!template){
  return { error: "Invalid exam type" };
}

  const pattern = difficultyPattern[difficulty];

  let finalPaper = [];
  let usedQuestions = new Set();
  const shuffle = arr => arr.sort(()=>Math.random()-0.5);
  for(let section of template){
    let qns = questions.filter(q=>q.marks===section.marks);
    if(qns.length < section.count){
      return { error: "Not enough questions for template" };
    }
    const easy = qns.filter(q=>q.difficulty==='Easy');
    const medium = qns.filter(q=>q.difficulty==='Medium');
    const hard = qns.filter(q=>q.difficulty==='Hard');

    const easyCount = Math.round(section.count * pattern.easy);
    const mediumCount = Math.round(section.count * pattern.medium);
    const hardCount = section.count - easyCount - mediumCount;

    shuffle(easy);
    shuffle(medium);
    shuffle(hard);

    let selected = [
      ...easy.slice(0,easyCount),
      ...medium.slice(0,mediumCount),
      ...hard.slice(0,hardCount)
    ];

    if(selected.length < section.count){
      let remaining = qns.filter(q=>!selected.includes(q));
      shuffle(remaining);
      selected.push(...remaining.slice(0,section.count-selected.length));
    }

    selected = selected.filter(q=>{
      if(usedQuestions.has(q.question)) return false;
      usedQuestions.add(q.question);
      return true;
    });

    finalPaper.push(...selected);
  }

  // unit coverage
  const units = [...new Set(questions.map(q=>q.unit))];

  for(let u of units){
    if(!finalPaper.some(q=>q.unit===u)){
      let candidate = questions.find(q=>q.unit===u && !usedQuestions.has(q.question));
      if(candidate){
        let idx = Math.floor(Math.random()*finalPaper.length);
        finalPaper[idx] = candidate;
        usedQuestions.add(candidate.question);
      }
    }
  }

  return finalPaper;
}
module.exports = generatePaper;