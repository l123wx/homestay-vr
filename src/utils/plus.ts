/* eslint-disable @typescript-eslint/ban-ts-comment */
const funList: any = []
export const Plus: any = (fun: any) => {
  if (_plus) {
    fun(_plus)
  } else {
    funList.push(fun)
  }
}
let _plus: any;
document.addEventListener('plusready', function() {
  // @ts-ignore
  _plus = plus
  funList.forEach((item: any) => {
    item(_plus)
  })
})