d3.csv("datasetv5.csv").then(function(data) {
    let nomsStates = new Array();

    console.log(data[0]);

    nomsStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    let infos = new Map();

    
    data.forEach(element => {
        for(state in nomsStates){
            if(element['location'].includes(nomsStates[state])){
                if(infos.has(nomsStates[state])){
                    infos.set(nomsStates[state],parseInt(infos.get(nomsStates[state]))+parseInt(element['fatalities']));
                }else{
                    infos.set(nomsStates[state],element['fatalities'])
                }
            }
        }
    });



});


d3.csv("datasetv5.csv", function(d) {
    return {
        case: d.case, // convert "Year" column to Date
        location: d.location,
        date: d.date,
        fatalities: d.fatalities, // convert "Length" column to number
        injured: d.injured,
        total_victims: d.total_victims,
        location2: d.location2,
        age_of_shooter: d.age_of_shooter,
        prior_signs_mental_health_issues: d.prior_signs_mental_health_issues,
        race: d.race,
        gender: d.gender,
        latitude: d.latitude,
        longitude: d.longitude,
        type: d.type,
        year: d.year
    };
    }, function(error, rows) {
    console.log(rows);
    });

    var legendText = ["Fatalities > 100", "Fatalities > 50", "Fatalities > 25", "Fatalities < 25"];
