let isValid = function(s) {
  const arr = [];
  const kh = ['(', ')', '[', ']', '{', '}'];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const index = kh.indexOf(char);
    if (index !== -1) {
      if (index % 2 === 0) {
        arr.unshift(char);
      } else {
        const myPre = kh[index - 1];
        if (arr[0] && arr[0] === myPre) {
          arr.shift();
        } else {
          return false;
        }
      }
    }
  }
  return arr.length === 0;
};

console.log(isValid('[{}(asdf])]'));
