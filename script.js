const citiesCsv = `10,20,Кропивницкий,200000
49,50,Киев,2868702
30,40,Львов,700000
#hello world
50,60,Харьков,1470000
70,80,Одесса,1000000
70,80,Херсон,286000
70,80,Франковск,237000
70,80,Чернигов,286000
70,80,Ужгород,115000
70,80,Луцк,217000
70,80,Хмельницк,100000
70,80,Мукачево,85000
70,80,Суммы,268000`;

function get(csvTxt) {
  const topListCity = [];
  let rating = 1;
  const topCity = csvTxt
    .split("\n")
    .filter((a) => a.match(/[а-я0-9]/gi))
    .map((el, i) => {
      let value = el.split(",");

      return {
        x: Number(value[0]),
        y: Number(value[1]),
        name: value[2],
        population: Number(value[3]),
      };
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .reduce((acc, a) => {
      const { name, population } = a;
      topListCity.push(name);
      acc[name] = { population, rating };
      rating++;
      return acc;
    }, {});
  console.log(topListCity);
  return (resultText) => {
    topListCity.forEach((city) => {
      if (resultText.includes(city)) {
        const { population, rating } = topCity[city];
        resultText = resultText.replace(
          city,
          `${city} (население: ${population}, рейтинг: ${rating})`
        );
      }
    });
    return resultText;
  };
}

console.log(
  get(citiesCsv)(
    "Одесса крупнейший морской курорт Украины, Киев столица и крупнейший город Украины"
  )
);
