const generatePaper = require('./generator');

describe('generatePaper', () => {
  const questions = [
    { question: 'Q1', unit: 'Unit1', marks: '2', difficulty: 'Easy' },
    { question: 'Q2', unit: 'Unit1', marks: '2', difficulty: 'Medium' },
    { question: 'Q3', unit: 'Unit2', marks: '2', difficulty: 'Easy' },
    { question: 'Q4', unit: 'Unit3', marks: '2', difficulty: 'Hard' },
    { question: 'Q5', unit: 'Unit1', marks: '2', difficulty: 'Easy' },
    { question: 'Q6', unit: 'Unit1', marks: '8', difficulty: 'Easy' },
    { question: 'Q7', unit: 'Unit2', marks: '8', difficulty: 'Medium' },
    { question: 'Q8', unit: 'Unit3', marks: '8', difficulty: 'Hard' },
    { question: 'Q9', unit: 'Unit1', marks: '16', difficulty: 'Medium' },
  ];

  it('should generate an assessment paper correctly', () => {
    const result = generatePaper(questions, 'Easy', 'Assessment');
    expect(result.error).toBeUndefined();
    expect(Array.isArray(result)).toBe(true);
    // Assessment template requires 5 2-marks, 3 8-marks, 1 16-marks. (Total 9 questions)
    expect(result.length).toBe(9);
    expect(result.filter(q => q.marks === '2').length).toBe(5);
    expect(result.filter(q => q.marks === '8').length).toBe(3);
    expect(result.filter(q => q.marks === '16').length).toBe(1);
  });

  it('should return error if not enough questions for template', () => {
    const result = generatePaper(questions, 'Easy', 'Endsem');
    // Endsem requires 10 2-marks, which we don't have
    expect(result.error).toBe('Not enough questions for template');
  });

  it('should return error for invalid exam type', () => {
    const result = generatePaper(questions, 'Easy', 'InvalidType');
    expect(result.error).toBe('Invalid exam type');
  });
});
