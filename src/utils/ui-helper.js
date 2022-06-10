export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  // console.log(to, perTick, element.scrollTop)
  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function backToTop(lyricList, delay = 10, element) {
  for (let i = 1; i < lyricList.length; i++) {
    await sleep(delay)

    element.current.scrollTop -= 32
    console.log(i, element.current.scrollTop)
    if (element.current.scrollTop === 0) break
  }
}
