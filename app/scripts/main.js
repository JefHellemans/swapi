(function() {

    Person = Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                height: "",
                mass: "",
                hair_color: "",
                skin_color: "",
                eye_color: "",
                birth_year: "",
                gender: "",
                homeworld: "",
                films: [],
                species: [],
                vehicles: [],
                starships: [],
                created: "",
                edited: "",
                url: ""
            };
        }

    });

    People = Backbone.Collection.extend({

        model: Person,
        localStorage: new Store("people-backbone")

    });

    Film = Backbone.Model.extend({

        defaults: function() {
            return {
                title: "",
                episode_id: "",
                opening_crawl: "",
                director: "",
                producer: "",
                release_date: "",
                characters: [],
                planets: [],
                starships: [],
                vehicles: [],
                species: [],
                created: "",
                edited: "",
                url: ""
            };
        }

    });

    Films = Backbone.Collection.extend({

        model: Film,
        localStorage: new Store("films-backbone")

    });

    Starship = Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                model: "",
                manufacturer: "",
                cost_in_credits: "",
                length: "",
                max_atmosphering_speed: "",
                crew: "",
                passengers: "",
                cargo_capacity: "",
                consumables: "",
                hyperdrive_rating: "",
                MGLT: "",
                starship_class: "",
                pilots: [],
                films: [],
                created: "",
                edited: "",
                url: ""
            };
        }

    });

    Starships = Backbone.Collection.extend({

        model: Starship,
        localStorage: new Store("starships-backbone")

    });

    Vehicle = Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                model: "",
                manufacturer: "",
                cost_in_credits: "",
                length: "",
                max_atmosphering_speed: "",
                crew: "",
                passengers: "",
                cargo_capacity: "",
                consumables: "",
                vehicle_class: "",
                pilots: [],
                films: [],
                created: "",
                edited: "",
                url: ""
            };
        }

    });

    Vehicles = Backbone.Collection.extend({

        model: Vehicle,
        localStorage: new Store("vehicles-backbone")

    });

    Race = Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                classification: "",
                designation: "",
                average_height: "",
                skin_colors: "",
                hair_colors: "",
                eye_colors: "",
                average_lifespan: "",
                homeworld: "",
                language: "",
                people: [],
                films: [],
                created: "",
                edited: "",
                url: ""
            };
        }
    });

    Species = Backbone.Collection.extend({

        model: Race,
        localStorage: new Store("species-backbone")

    });

    Planet = Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                rotation_period: "",
                orbital_period: "",
                diameter: "",
                climate: "",
                gravity: "",
                terrain: "",
                surface_water: "",
                population: "",
                residents: [],
                films: [],
                created: "",
                edited: "",
                url: ""
            };
        }

    });

    Planets = Backbone.Collection.extend({

        model: Planet,
        localStorage: new Store("planets-backbone")

    });

    var people = new People();
    var films = new Films();
    var starships = new Starships();
    var vehicles = new Vehicles();
    var species = new Species();
    var planets = new Planets();

    var getArrayFromApi = function(collection, group, firstPage, count, cb) {
        getArray(collection, group, firstPage["results"], function(err, col) {
            if(count <= 2) {
                cb(null, col);
            }
        });
        for(var i = 2; i <= count + 1; i++) {
            getElementFromApi(group, i, function(err, elem, pos) {
                getArray(collection, group, elem["results"], function(err, col) {
                    if(pos >= count) {
                        cb(null, col);
                    }
                });
            });
        }
    };

    var getElementFromApi = function(group, elem, cb) {
        var getPage = new XMLHttpRequest();
        getPage.onreadystatechange = function() {
            if (getPage.readyState == 4 && getPage.status == 200) {
                var data = JSON.parse(getPage.responseText);
                cb(null, data, elem)
            }
        };
        getPage.open("GET", "http://swapi.co/api/" + group + "/?page=" + elem + "&format=json", true);
        getPage.send();
    };

    var getArray = function(collection, group, elements, cb) {
        var count = elements.length;
        for(var j = 0; j < count; j++) {
            getElement(group, j, elements[j], function(err, elem, pos) {
                if(err) {
                    cb(true, null);
                } else {
                    collection.add(elem);
                    if(++pos == count) {
                        cb(null, collection);
                    }
                }
            });
        }
    };

    var getElement = function(group, pos, elem, cb) {
        switch(group) {
            case "people":
                createPerson(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            case "films":
                createFilm(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            case "starships":
                createStarship(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            case "vehicles":
                createVehicle(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            case "species":
                createRace(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            case "planets":
                createPlanet(elem, function(err, item) {
                    cb(null, item, pos);
                });
                break;
            default:
                cb(true, null, pos);
                break;
        }
    };

    var createPerson = function(data, cb) {
        if(!data["name"]) {
            cb(true, null);
        } else {
            var p = new Person();
            p.set('name', data["name"]);
            p.set('height', data["height"]);
            p.set('mass', data["mass"]);
            p.set('hair_color', data["hair_color"]);
            p.set('skin_color', data["skin_color"]);
            p.set('eye_color', data["eye_color"]);
            p.set('birth_year', data["birth_year"]);
            p.set('gender', data["gender"]);
            p.set('homeworld', data["homeworld"]);
            p.set('films', data["films"]);
            p.set('species', data["species"]);
            p.set('vehicles', data["vehicles"]);
            p.set('starships', data["starships"]);
            p.set('created', data["created"]);
            p.set('edited', data["edited"]);
            p.set('url', data["url"]);
            cb(null, p);
        }
    };

    var createFilm = function(data, cb) {
        if(!data["title"]) {
            cb(true, null);
        } else {
            var f = new Film();
            f.set('title', data["title"]);
            f.set('episode_id', data["episode_id"]);
            f.set('opening_crawl', data["opening_crawl"]);
            f.set('director', data["director"]);
            f.set('producer', data["producer"]);
            f.set('release_date', data["release_date"]);
            f.set('characters', data["characters"]);
            f.set('planets', data["planets"]);
            f.set('starships', data["starships"]);
            f.set('vehicles', data["vehicles"]);
            f.set('species', data["species"]);
            f.set('created', data["created"]);
            f.set('edited', data["edited"]);
            f.set('url', data["url"]);
            cb(null, f);
        }
    };

    var createStarship = function(data, cb) {
        if(!data["name"]) {
            cb(true, null);
        } else {
            var s = new Starship();
            s.set('name', data["name"]);
            s.set('model', data["model"]);
            s.set('manufacturer', data["manufacturer"]);
            s.set('cost_in_credits', data["cost_in_credits"]);
            s.set('length', data["length"]);
            s.set('max_atmosphering_speed', data["max_atmosphering_speed"]);
            s.set('crew', data["crew"]);
            s.set('passengers', data["passengers"]);
            s.set('cargo_capacity', data["cargo_capacity"]);
            s.set('consumables', data["consumables"]);
            s.set('hyperdrive_rating', data["hyperdrive_rating"]);
            s.set('MGLT', data["MGLT"]);
            s.set('starship_class', data["starship_class"]);
            s.set('pilots', data["pilots"]);
            s.set('films', data["films"]);
            s.set('created', data["created"]);
            s.set('edited', data["edited"]);
            s.set('url', data["url"]);
            cb(null, s);
        }
    };

    var createVehicle = function(data, cb) {
        if(!data["name"]) {
            cb(true, null);
        } else {
            var v = new Vehicle();
            v.set('name', data["name"]);
            v.set('model', data["model"]);
            v.set('manufacturer', data["manufacturer"]);
            v.set('cost_in_credits', data["cost_in_credits"]);
            v.set('length', data["length"]);
            v.set('max_atmosphering_speed', data["max_atmosphering_speed"]);
            v.set('crew', data["crew"]);
            v.set('passengers', data["passengers"]);
            v.set('cargo_capacity', data["cargo_capacity"]);
            v.set('consumables', data["consumables"]);
            v.set('vehicle_class', data["vehicle_class"]);
            v.set('pilots', data["pilots"]);
            v.set('films', data["films"]);
            v.set('created', data["created"]);
            v.set('edited', data["edited"]);
            v.set('url', data["url"]);
            cb(null, v);
        }
    };

    var createRace = function(data, cb) {
        if(!data["name"]) {
            cb(true, null);
        } else {
            var r = new Race();
            r.set('name', data["name"]);
            r.set('classification', data["classification"]);
            r.set('designation', data["designation"]);
            r.set('average_height', data["average_height"]);
            r.set('skin_colors', data["skin_colors"]);
            r.set('hair_colors', data["hair_colors"]);
            r.set('eye_colors', data["eye_colors"]);
            r.set('average_lifespan', data["average_lifespan"]);
            r.set('homeworld', data["homeworld"]);
            r.set('language', data["language"]);
            r.set('people', data["people"]);
            r.set('films', data["films"]);
            r.set('created', data["created"]);
            r.set('edited', data["edited"]);
            r.set('url', data["url"]);
            cb(null, r);
        }
    };

    var createPlanet = function(data, cb) {
        if(!data["name"]) {
            cb(true, null);
        } else {
            var p = new Planet();
            p.set('name', data["name"]);
            p.set('rotation_period', data["rotation_period"]);
            p.set('orbital_period', data["orbital_period"]);
            p.set('diameter', data["diameter"]);
            p.set('climate', data["climate"]);
            p.set('gravity', data["gravity"]);
            p.set('terrain', data["terrain"]);
            p.set('surface_water', data["surface_water"]);
            p.set('population', data["population"]);
            p.set('residents', data["residents"]);
            p.set('films', data["films"]);
            p.set('created', data["created"]);
            p.set('edited', data["edited"]);
            p.set('url', data["url"]);
            cb(null, p);
        }
    };

    var DetailView = Backbone.View.extend({
        tagName: "section",
        template: _.template("<%- name %>"),
        events: {

        },
        makeList: function(element, collection, group) {
            var view = new ItemView();
            view.showList(element, collection, group);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ItemView = Backbone.View.extend({
        tagName: "li",
        template: _.template("<a href='#'><%- name %></a>"),
        group: "",
        events: {
            'click a': 'showDetails'
        },
        showList: function(element, collection, group) {
            element.empty();
            if (collection instanceof Backbone.Model) {
                var view = new ItemView({model: collection});
                view.group = group;
                if(group == "films") {
                    view.template = _.template("<a href='#'><%- title %></a>");
                }
                element.append(view.render().el);
            } else if (collection instanceof Backbone.Collection) {
                collection.forEach(function(item, index) {
                    if(index < 10) {
                        var view = new ItemView({model: item});
                        view.group = group;
                        if(group == "films") {
                            view.template = _.template("<a href='#'><%- title %></a>");
                        }
                        element.append(view.render().el);
                    }
                });
            }
        },
        showDetails: function(e) {
            e.preventDefault();
            document.getElementById("search").value = "";
            App.search();
            var container = $("#result");
            container.empty();
            var view = new DetailView({model: this.model});
            switch(this.group) {
                case "people":
                    view.template = _.template($("#person-template").html());
                    container.append(view.render().el);
                    view.makeList($(".homeworld"), this.model.get('homeworld'), "planets");
                    view.makeList($(".films"), this.model.get('films'), "films");
                    view.makeList($(".species"), this.model.get('species'), "species");
                    view.makeList($(".vehicles"), this.model.get('vehicles'), "vehicles");
                    view.makeList($(".starships"), this.model.get('starships'), "starships");
                    break;
                case "films":
                    view.template = _.template($("#film-template").html());
                    container.append(view.render().el);
                    view.makeList($(".characters"), this.model.get('characters'), "people");
                    view.makeList($(".planets"), this.model.get('planets'), "planets");
                    view.makeList($(".starships"), this.model.get('starships'), "starships");
                    view.makeList($(".vehicles"), this.model.get('vehicles'), "vehicles");
                    view.makeList($(".species"), this.model.get('species'), "species");
                    break;
                case "starships":
                    view.template = _.template($("#starship-template").html());
                    container.append(view.render().el);
                    view.makeList($(".pilots"), this.model.get('pilots'), "people");
                    view.makeList($(".films"), this.model.get('films'), "films");
                    break;
                case "vehicles":
                    view.template = _.template($("#vehicle-template").html());
                    container.append(view.render().el);
                    view.makeList($(".pilots"), this.model.get('pilots'), "people");
                    view.makeList($(".films"), this.model.get('films'), "films");
                    break;
                case "species":
                    view.template = _.template($("#race-template").html());
                    container.append(view.render().el);
                    view.makeList($(".people"), this.model.get('people'), "people");
                    view.makeList($(".films"), this.model.get('films'), "films");
                    break;
                case "planets":
                    view.template = _.template($("#planet-template").html());
                    container.append(view.render().el);
                    view.makeList($(".residents"), this.model.get('residents'), "people");
                    view.makeList($(".films"), this.model.get('films'), "films");
                    break;
            }
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var AppView = Backbone.View.extend({

        el: $("#app"),
        template: _.template($('#loading-template').html()),
        status: "",
        events: {
            'keyup #search': 'search',
            'click [type="checkbox"]':'search'
        },
        search: function(){
            var val = document.getElementById("search").value;
            if(val.length >= 1) {
                getOptions(val);
            } else {
                getOptions("thisstringshouldnevershowupandthereforeclearthelists");
            }
        },
        initialize: function() {
            this.status = "Bribing stormtroopers...";
            this.render();
        },
        showSearch: function() {
            this.status = "";
            this.template = _.template($('#search-template').html());
            this.render();
        },
        render: function() {
            if(this.status != "") {
                this.$el.html(this.template({status: this.status}));
            } else {
                this.$el.html(this.template());
            }
        }

    });

    var App = new AppView;

    var getOptions = function(val) {
        $("input[type=checkbox]").each(function() {
            var group = $(this).val();
            var options;
            var collection;
            switch(group) {
                case "people":
                    options = new People();
                    collection = people;
                    break;
                case "films":
                    options = new Films();
                    collection = films;
                    break;
                case "starships":
                    options = new Starships();
                    collection = starships;
                    break;
                case "vehicles":
                    options = new Vehicles();
                    collection = vehicles;
                    break;
                case "species":
                    options = new Species();
                    collection = species;
                    break;
                case "planets":
                    options = new Planets();
                    collection = planets;
                    break;
            }
            if($(this).is(":checked")) {
                compareOptions(options, collection, group, val, function(err, o) {
                    var view = new ItemView();
                    view.showList($("#" + group), o, group);
                });
            } else {
                var view = new ItemView();
                view.showList($("#" + group), options, group);
            }
        });
    };

    var compareOptions = function(options, collection, group, val, cb) {
        collection.forEach(function(option, index) {
            compare(group, option, val, function(err, add) {
                if(add) {
                    options.add(option);
                }
                if(++index === collection.length) {
                    cb(null, options);
                }
            });
        });
    };

    var compare = function(group, option, val, cb) {
        var attribute;
        if(group === "films") {
            attribute = option.get("title").toLowerCase();
        } else {
            attribute = option.get("name").toLowerCase();
        }
        if(attribute.indexOf(val.toLowerCase()) != -1) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    var loadFromApi = function(collection, group) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                getArrayFromApi(collection, group, data, (data["count"] / 10), function(err, data) {
                    doneLoading(group);
                });
            }
        };
        request.open("GET", "http://swapi.co/api/" + group + "/?format=json", true);
        request.send();
    };

    var loaded = [];
    var doneLoading = function(group) {
        loaded.push(group);
        if(loaded.length === 1) {
            App.status = "Feeding Chewie...";
            App.render();
        }
        if(loaded.length === 2) {
            App.status = "Spellchecking Yoda...";
            App.render();
        }
        if(loaded.length === 3) {
            App.status = "Hugging Darth Vader...";
            App.render();
        }
        if(loaded.length === 4) {
            App.status = "Kissing Princess Leia...";
            App.render();
        }
        if(loaded.length === 5) {
            App.status = "Podracing with Anakin...";
            App.render();
        }
        if(loaded.length === 6) {
            makeCollections();
        }
    };

    var makeCollections = function() {
        loaded.forEach(function(group, index) {
            collectForGroup(group, function(err, collection) {
                if(++index === loaded.length) {
                    App.showSearch();
                }
            });
        });
    };

    var collectForGroup = function(group, cb) {
        switch(group) {
            case "people":
                people.forEach(function(person, index) {
                    collectForPerson(person, function(err, p) {
                        if(++index === people.length) {
                            cb(null, people);
                        }
                    });
                });
                break;
            case "films":
                films.forEach(function(film, index) {
                    collectForFilm(film, function(err, f) {
                        if(++index === films.length) {
                            cb(null, films);
                        }
                    });
                });
                break;
            case "starships":
                starships.forEach(function(starship, index) {
                    collectForStarship(starship, function(err, s) {
                        if(++index === starships.length) {
                            cb(null, starships);
                        }
                    });
                });
                break;
            case "vehicles":
                vehicles.forEach(function(vehicle, index) {
                    collectForVehicle(vehicle, function(err, v) {
                        if(++index === vehicles.length) {
                            cb(null, vehicles);
                        }
                    });
                });
                break;
            case "species":
                species.forEach(function(race, index) {
                    collectForRace(race, function(err, r) {
                        if(++index === species.length) {
                            cb(null, species);
                        }
                    });
                });
                break;
            case "planets":
                planets.forEach(function(planet, index) {
                    collectForPlanet(planet, function(err, p) {
                        if(++index === planets.length) {
                            cb(null, planets);
                        }
                    });
                });
                break;
        }
    };

    var collect = function(item, attribute, collection, cb) {
        var values = item.get(attribute);
        var objects;
        switch(collection) {
            case people:
                objects = new People();
                break;
            case films:
                objects = new Films();
                break;
            case starships:
                objects = new Starships();
                break;
            case vehicles:
                objects = new Vehicles();
                break;
            case species:
                objects = new Species();
                break;
            case planets:
                objects = new Planets();
                break;
        }
        if(typeof values === 'string') {
            getValueFromCollection(values, collection, function(err, object) {
                if(err) {
                    //cb(true, null);
                } else {
                    item.set(attribute, object);
                    cb(null, item);
                }
            });
        } else if(values.length > 0) {
            values.forEach(function(value, index) {
                getValueFromCollection(value, collection, function(err, object) {
                    if(err) {
                        //cb(true, null);
                    } else {
                        objects.add(object);
                    }
                    if(objects.length === values.length) {
                        item.set(attribute, objects);
                        cb(null, item);
                    }
                });
            });
        } else {
            cb(null, item);
        }
    };

    var getValueFromCollection = function(value, collection, cb) {
        collection.forEach(function(item, index) {
            if(item.get('url') === value) {
                cb(null, item);
            }
            if(++index === collection.length) {
                cb(true, null);
            }
        });
    };

    var collectForPerson = function(person, cb) {
        collect(person, "films", films, function(err, p) {
            person = p;
            collect(person, "species", species, function(err, p) {
                person = p;
                collect(person, "vehicles", vehicles, function(err, p) {
                    person = p;
                    collect(person, "starships", starships, function(err, p) {
                        person = p;
                        collect(person, "homeworld", planets, function(err, p) {
                            person = p;
                            cb(null, person);
                        });
                    });
                });
            });
        });
    };

    var collectForFilm = function(film, cb) {
        collect(film, "characters", people, function(err, f) {
            film = f;
            collect(film, "planets", planets, function(err, f) {
                film = f;
                collect(film, "starships", starships, function(err, f) {
                    film = f;
                    collect(film, "vehicles", vehicles, function(err, f) {
                        film = f;
                        collect(film, "species", species, function(err, f) {
                            film = f;
                            cb(null, film);
                        })
                    });
                });
            });
        });
    };

    var collectForStarship = function(starship, cb) {
        collect(starship, "pilots", people, function(err, s) {
            starship = s;
            collect(starship, "films", films, function(err, s) {
                starship = s;
                cb(null, starship);
            });
        });
    };

    var collectForVehicle = function(vehicle, cb) {
        collect(vehicle, "pilots", people, function(err, v) {
            vehicle = v;
            collect(vehicle, "films", films, function(err, v) {
                vehicle = v;
                cb(null, vehicle);
            });
        });
    };

    var collectForRace = function(race, cb) {
        collect(race, "people", people, function(err, r) {
            race = r;
            collect(race, "films", films, function(err, r) {
                race = r;
                cb(null, race);
            });
        });
    };

    var collectForPlanet = function(planet, cb) {
        collect(planet, "residents", people, function(err, p) {
            planet = p;
            collect(planet, "films", films, function(err, p) {
                planet = p;
                cb(null, planet);
            });
        });
    };

    loadFromApi(people, "people");
    loadFromApi(films, "films");
    loadFromApi(starships, "starships");
    loadFromApi(vehicles, "vehicles");
    loadFromApi(species, "species");
    loadFromApi(planets, "planets");

})();