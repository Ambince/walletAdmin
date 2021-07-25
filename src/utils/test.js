function formateSingouts() {
  const singout =
    '14gWnVQCoEtLh6Qmm94ccM9Dq3TZhck2nT||03e658da4ab0ef38fec5ceebf327fe41aad0cbf764180446fd4a8c94940f8e6cc8@bsv:livenet';

  const singoutAarry = singout.split('|');

  console.log('Amence publicKey', singoutAarry[singoutAarry.length - 1].split('@')[0]);
  console.log('Amence publicKey', singoutAarry);
}

function dateFormate(){
  console.log(new Date().toLocaleString());
}

formateSingouts();
dateFormate();
