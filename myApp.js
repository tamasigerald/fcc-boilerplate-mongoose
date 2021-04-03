require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('DB connected!')
})
.catch(err => {
  console.error('DB connection error', err);
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [{
    type: String
  }]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Gerald",
    age: 24,
    favoriteFoods: [
      "Pizza",
      "Burger"
    ]
  });
  newPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const arrayOfPeople = [
  {name: "Eddie", age: 31, favoriteFoods: ["Picanha"]},
  {name: "Manu", age: 37, favoriteFoods: ["Burger"]},
  {name: "July", age: 19, favoriteFoods: ["Pasta"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, found) {
    if (err) return console.error(err);
    done(null, found);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, found) {
    if (err) return console.error(err);
    done(null, found);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, found) {
    if (err) return console.error(err);
    done(null, found);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updated) {
    if (err) return console.error(err);
    done(null, updated);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, res) {
    if (err) return console.error(err);
    done(null, res);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, res) {
    if (err) return console.error(err);
    done(null, res);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
