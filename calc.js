const fs = require('fs');
const arr = fs.readFileSync('female.md')
  .toString()
  .split("\n")
let list = {}
let total = 0
for (let i in arr) {
  let t = arr[i].split('\t')
  let a = t[0] ? t[0].trim() : ''
  let b = t[1] ? t[1].trim() : ''
  if (a == 'X' || a == '') {
    continue;
  }
  if (!list[a]) {
    list[a] = 0
  }
  if (!list[b]) {
    list[b] = 0
  }
  list[a]++;
  list[b]++;
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
fs.writeFileSync('female.csv', data.join('\n'))
