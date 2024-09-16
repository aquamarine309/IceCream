function removeEruda() {
  if ("eruda" in window) eruda._$el.remove();
}

removeEruda();

function load(qq) {
  const svg = document.querySelector('svg');
  svg.style.display = 'block';
  const ui = document.querySelector('#ui');//输入QQ号的ui
  if (!qq) {
    qq = parseInt(document.querySelector('#qq').value);
  }
  if (!qq || Number.isNaN(qq)) return;
  ui.remove();
  const width = window.innerWidth;
  svg.setAttribute('width', width);
  const widthPercentage = width / 400;
  const fixedW = 375 * widthPercentage;;
  const s = Snap('svg');
  const radius = width / 20;//半径
  const p = 0.50 + 0.09 * Math.random(); //偏左的概率
  const head = document.querySelector('svg #head image');
  const fox = document.querySelector('svg #fox image');
  head.setAttribute('xlink:href', `http://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=640&img_type=jpg`);
  head.setAttribute('width', 2 * radius);
  head.setAttribute('height', 2 * radius);
  fox.setAttribute('width',width);
  fox.setAttribute('height', fixedW);
  const position = [[152 * widthPercentage, -250 * widthPercentage]];
  function lastEl(arr, i) {
    return arr[Math.max(i - 1, 0)];
  }
  for (
    let i = 1;
    lastEl(position, i)[0] > radius * 0.8 &&
    lastEl(position, i)[0] < radius * 0.05 + width;
    i++
  ) {
    position[i] = [
      position[i - 1][0] + 1.5 * radius * (Math.random() - p),
      position[i - 1][1] - (1.4 + Math.random() * 0.2) * radius
    ]
  }
  const h = 150 * widthPercentage - position[position.length - 1][1];
  svg.setAttribute('height', h)
  const bgGradientPow = -h / (7.5 * width);
  s.rect(0, 0, width, h - fixedW).attr({
    fill: s.gradient(
      `l(0, 0, 0, 1)rgb(${64 + 180 * Math.pow(2.5, bgGradientPow)},${64 + 180 * Math.pow(2.5 , bgGradientPow)},${108 + 180 * Math.pow(1.8, bgGradientPow)})-#fff`
    )
  });
  s.rect(0, h - fixedW, width, fixedW).attr({
    fill: 'url(#fox)'
  });
  for (let i = 0; i < position.length; i++) {
    s.circle(position[i][0], position[i][1] + h, radius).attr({
      fill: `url(#head)`
    })
  };
  s.text(
    30,
    h - 90 * widthPercentage,
    `${(
      15 * (
        position[0][1] -
        position[position.length - 1][1] + 2 * radius
      ) / width
    ).toFixed(1)}km`
  )
  .attr({
    'font-size': width / 10
  });
};
