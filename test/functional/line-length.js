module.exports = [
  {
    desc: 'should pass when line length not exceeds the maximum value',
    input: '1234',
    opts: { 'line-length': 5 },
    output: 0
  }, {
    desc: 'should pass when line length equals to the maximum value',
    input: '12345',
    opts: { 'line-length': 5 },
    output: 0
  }, {
    desc: 'should fail when line length exceeds the maximum value',
    input: '123456',
    opts: { 'line-length': 5 },
    output: 1
  }, {
    desc: 'should pass when line length matches ignore-regex',
    input: '<a href="http://www.google.com">12345</a>',
    opts: { 'line-length': 5, 'line-length-ignore-regex': 'href' },
    output: 0
  }
];
