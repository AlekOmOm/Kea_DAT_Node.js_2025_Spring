<<<<<<< HEAD

function partyFactory() {
  return {
    partyName: 'Birthday Party',
    props: 'Balloons, Cake, Candles',
  };
}
=======
function partyFactory(partyName) {
    return {
        partyName,
        supplies: ["🥳", "🍾", "🥂", "🎈", "🎉", "🎊", "🎓"]
    };
}

// export const partyFactoryExport = partyFactory;
export default partyFactory;
>>>>>>> 5e87b53309de6f61fe46bf2ba52e8d9d08f13542
