// @booting

interface Number {
  toSatoshi: () => number;
  toBSV: () => number;
  toCurrency: (rate: number) => number;
  toLocal: () => string;
}

interface String {
  toNoCommaNumber: () => number;
}
