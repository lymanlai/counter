const fs = require('fs');
const _ = require('lodash');
calcData('wz-female-full')
calcData('wz-male-full')
calcData('zz-male-full')
calcData('mg-female')
calcData('mg-male')
calcData('zz-female')

function calcData(fileName) {
  const arr = fs.readFileSync(`${fileName}.md`)
    .toString()
    .split("\n")
  let header = arr.shift()
    .split('\t')
  header.shift()
  let all = {}
  let allKeys = []
  for (let j in arr) {
    let oneRow = arr[j]
    oneRow = oneRow.split('\t')
    oneRow.shift()
    for (let i = 0; i < header.length; i++) {
      if (!all[header[i]]) {
        all[header[i]] = []
      }
      all[header[i]].push(oneRow[i])
      all[header[i]].push(oneRow[parseInt(i) + 1])
      i++
    }
  }
  for (let i in all) {
    let total = 0
    let list = {}
    for (let j in all[i]) {
      let key = all[i][j]
      if (!key) {
        continue;
      }
      key = key.replace('?', '')
        .replace('？', '')
        .replace(' ', '')
        .trim()
      if (key == '') {
        continue;
      }
      if (!list[key]) {
        allKeys.push(key)
        list[key] = 0
      }
      list[key]++
        total++
    }
    for (let key in list) {
      list[key] = list[key] / total
    }
    all[i] = list
  }
  let tmp = []
  allKeys.forEach(item => {
    if (tmp.includes(item)) {
      return
    }
    tmp.push(item)
  })
  allKeys = tmp
  allKeys = allKeys.sort((a, b) => {
    return a - b
  })
  let data = []
  theHeader = Object.keys(all)
  theHeader.unshift('')
  data.push(theHeader.join(', '))
  for (let row in allKeys) {
    let oneRowData = []
    oneRowData.push(allKeys[row])
    for (let key in all) {
      if (all[key][allKeys[row]]) {
        oneRowData.push(all[key][allKeys[row]])
      } else {
        oneRowData.push('')
      }
    }
    data.push(oneRowData.join(', '))
  }
  // // console.log(data)
  // console.log(Object.keys(all))
  // // data.push('key, type, percentage')
  // // for (let key in all) {
  // //   let tmp = []
  // //   tmp.push(key)
  // //   for (let i in all[key]) {
  // //     tmp.push(i)
  // //     tmp.push(all[key][i])
  // //   }
  // //   data.push(tmp.join(', '))
  // // }
  // // console.log(data)
  fs.writeFileSync(`${fileName}.csv`, data.join('\n'))
}
