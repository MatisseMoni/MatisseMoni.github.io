var json_list;
var params = { "prix_min": 0, "prix_max": 1, "lieu": [], "nb_persones_max": 0, "categorys": [] }
var filter = { "lieu": "all", "prix_min": 0, "prix_max": -1, "nb_persones": "all", "categorys": [] }
var filter_origine = JSON.parse(JSON.stringify(filter));

fetch("./liste_activites.json").then(function(response) {
        return response.json()
    })
    .then((data) => {
        json_list = data;
        json_list["data"]["activites"].forEach(obj => {
            $('#results-container').append(card(obj));
        })

        init_params()
        init_filter()
    });


function refrech_list() {
    const result = $("#results-container");
    result.empty();
    json_list["data"]["activites"].forEach(obj => {
        if (!obj["criteres"]["lieu"].includes(filter["lieu"]) && filter["lieu"] != 'all') {
            console.log(obj["name"], 'lieu false', !obj["criteres"]["lieu"].includes(filter["lieu"]), filter["lieu"] != 'all')
        } else if (obj["criteres"]["prix"]["prix_max"] < (filter["prix_min"])) {
            console.log(obj["name"], 'prix_min false')
        } else if ((obj["criteres"]["prix"]["prix_min"] > (filter["prix_max"]) && filter["prix_max"] != -1)) {
            console.log(obj["name"], 'prix_max false')
        } else if (obj["criteres"]["nb_persones"] < (filter["nb_persones"]) && filter["nb_persones"] != "all" && obj["criteres"]["nb_persones"] != -1) {
            console.log(obj["name"], 'nb_persones false')
        } else if (!obj["criteres"]["categorys"].some(r => filter["categorys"].includes(r)) && filter["categorys"].length != 0) {
            console.log(obj["name"], 'categorys false', filter["categorys"].length)
        } else {
            result.append(card(obj));
        }
    })
    console.log(filter, filter_origine)

}

function refrech_filter() {
    filter = JSON.parse(JSON.stringify(filter_origine));
    console.log(filter, filter_origine)
    refrech_list();
}

function init_params() {
    pMax = 0;
    nbPMax = 0;
    json_list["data"]["activites"].forEach(obj => {
        obj["criteres"]["lieu"].forEach(l => {
            if (!params["lieu"].includes(l)) {
                params["lieu"].push(l)
            }
        })
        obj["criteres"]["categorys"].forEach(c => {
            if (!params["categorys"].includes(c)) {
                params["categorys"].push(c)
            }
        })
        pMax < obj["criteres"]["prix"]["prix_max"] ? pMax = obj["criteres"]["prix"]["prix_max"] : null;
        nbPMax < obj["criteres"]["nb_persones"] ? nbPMax = obj["criteres"]["nb_persones"] : null;
        console.log(obj["criteres"]["nb_persones"], nbPMax, nbPMax < obj["criteres"]["nb_persones"])
    })
    params["prix_max"] = pMax;
    params["nb_persones_max"] = nbPMax;
}

function init_filter() {
    div_lieu = $("<div class='div_input' id='div_lieu'></div>");
    $(div_lieu).append("<label for ='lieu'>Lieu : </label><br>");
    $(div_lieu).append("<select id='lieu' name='lieu'></select>")
    $(div_lieu).find("select").append("<option value='all'>Tout</option>");
    params["lieu"].forEach(l => {
        $(div_lieu).find("select").append("<option value='" + l + "'>" + l + "</option>");
    });
    $("#filters-container").append($(div_lieu));

    div_prix = $("<div class='div_input' id='div_prix'></div>");
    $(div_prix).append("<label for ='prix'>Prix : </label><br><br>");
    $(div_prix).append("<input class='range-slider' name='prix' type='hidden' value='" + params['prix_min'] + "," + params['prix_max'] + "' style='display: none;'>");

    $("#filters-container").append($(div_prix));
    $('.range-slider').jRange({
        from: 0,
        to: params['prix_max'],
        step: 1,
        scale: [0, params['prix_max']],
        format: '%s',
        width: 300,
        showLabels: true,
        isRange: true
    });

    div_persones = $("<div class='div_input' id='div_persones'></div>");
    $(div_persones).append("<label for ='nb_persones'>Nombre de persones : </label><br>");
    $(div_persones).append("<select id='nb_persones' name='nb_persones'></select>")
    $(div_persones).find("select").append("<option value='all'>Tout</option>");
    for (i = 1; i <= params['nb_persones_max']; i++) {
        $(div_persones).find("select").append("<option value='" + i + "'>" + i + "</option>");
    }
    $("#filters-container").append($(div_persones));


    div_checkbox = $('<div class="div_input" id="div_checkbox"></div>');
    $(div_checkbox).append("<legend>Catégories : </legend>")
    params["categorys"].forEach(c => {
        $(div_checkbox).append('<input class="checkbox" type="checkbox" name="categorys" value="' + c + '"><span>' + c + '</span></input><br>');
    });
    $("#filters-container").append($(div_checkbox));

    $("#filters-container").append($('<button type="button" id="refresh">Refresh</button>'))
    init_listener()
}


function init_listener() {
    $("select").change(function() {
        filter[this.name] = this.value;
        console.log(this.name, filter[this.name])
        refrech_list();
    });

    $(".range-slider").change(function() {
        console.log(this.value);
        range = this.value.split(",");
        prix_min = parseInt(range[0])
        prix_max = parseInt(range[1])
        filter["prix_min"] = prix_min;
        filter["prix_max"] = prix_max;
        refrech_list();
    })

    $(".checkbox").change(function() {
        if (this.checked) {
            filter["categorys"].push(this.value);
        } else {
            index = filter["categorys"].indexOf(this.value);
            if (index !== -1) {
                filter["categorys"].splice(index, 1);
            }
        }
        refrech_list();
    })

    $("#refresh").click(function() {
        refrech_filter();
    })
}


//renderer

function card(activites) {
    card_div = $("<div></div>").append("<div class='uk-card uk-card-hover  uk-card-body uk-card-primary el-item'></div>")
    $(card_div).find(".uk-card").append("<h3 class='uk-card-title el-title'>" + activites["name"] + "</h3>").append("<p class='el-meta'>" + activites["description"] + "</p>")
    return $(card_div);
}