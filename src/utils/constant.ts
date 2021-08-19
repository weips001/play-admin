export const rechargeType = [
  {
    label: '100元',
    value: '3-100',
    total: 3,
    cardType: '0',
    money: 100,
    month: 12,
  },
  {
    label: '300元',
    total: 10,
    value: '12-300',
    cardType: '0',
    money: 300,
    month: 12,
  },
  {
    label: '500元',
    total: 20,
    value: '20-500',
    cardType: '0',
    money: 500,
    month: 24,
  },
  {
    label: '年卡',
    total: -1,
    cardType: '1',
    value: '-1-1200',
    money: 1200,
    month: 12,
  },
];

export const sexType = [
  {
    label: '男',
    value: '0',
  },
  {
    label: '女',
    value: '1',
  },
];

export const cardTypeEnum = {
  0: '次卡',
  1: '年卡',
};
function generateConsumeOption(total = 3, unit = '次') {
  const res = [];
  for (let i = 0; i < total; i++) {
    res.push({
      label: `${i + 1} ${unit}`,
      value: i + 1,
    });
  }
  return res;
}
export const consumeNum = generateConsumeOption(6);

export const gameBiType = [
  {
    label: '100元',
    value: 100,
    total: 130,
    month: 12,
  },
  {
    label: '200元',
    value: 200,
    total: 270,
    month: 12,
  },
];

export const consumeGameBi = generateConsumeOption(30, '个');
