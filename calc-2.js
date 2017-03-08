const fs = require('fs');
const arr = fs.readFileSync('zz-male.md')
  .toString()
  .split("\n")
  .join('\t')
  .split('\t')
let list = {}
let total = 0
for (let i in arr) {
  let t = arr[i].replace('?', '')
    .replace('？', '')
    .trim()
  if (t == '') {
    continue;
  }
  if (!list[t]) {
    list[t] = 0
  }
  list[t]++;
  total++;
}
let data = []
data.push('key, count, percentage')
for (let key in list) {
  list[key] = {
    count: list[key],
    percentage: list[key] / total
  }
  data.push([key, list[key].count, list[key].percentage].join(', '))
}
console.log(data)
fs.writeFileSync('zz-male.csv', data.join('\n'))
