var filter_map = {
	level_min: 0,
	level_max: 10
};
$.getJSON("./all.json", null, function(json_data, status) {
	data = json_data;
	for (k in data) {
		var o = data[k]
		$("#spell-list").append(
			'<li class="row justify-content-center"><div id="' + k +
			'" class="card spellcard col-9"><h5 class="card-header">' + o.name +
			' <span class="badge badge-dark">' + o.type.toLowerCase() + ' ' + o.level + '</span></h5></div></li>'
		);
	}
	$(".spellcard").on('click', populate);
	$(".filters").on('change', update_filters);
});
function update_filters() {
	filter_map.level_min = $('#levelfilter_min').val();
	filter_map.level_max = $('#levelfilter_max').val();
	filter_list();
	return false;
}
function filter_list() {
	for (k in data) {
		level = data[k].level
		if (level < filter_map.level_min || level > filter_map.level_max) {
			$("#" + k).hide();
			continue;
		}
		$("#" + k).show();
	}
}

function property_tags(spell_data) {
	var props = [
		'area', 'duration', 'target', 'range', 'trigger', 'requirements',
		'cost', 'casting-time'
	];
	var result = []
	for (let prop of props) {
		if (spell_data[prop]) {
			result.push('<strong>' + prop + '</strong>: ' + spell_data[prop]);
		}
	}
	return result.map(function(item) { return '<li class="list-inline-item">' + item + '</li>'; }).join("");
}

function subsections(spell_data) {
	if (!spell_data.description.subsections) {
		return ''
	}
	var result = [];
	var translator = {
		'crit-fail': 'Critical Failure',
		'crit': 'Critical Success',
		'success': 'Success',
		'failure': 'Failure'
	}
	var subs = spell_data.description.subsections

	for (sub in subs) {
		var title = sub;
		if (translator.hasOwnProperty(sub)) {
			title = translator[sub];
		}
		result.push('<dt class="col-sm-3">' + title + '</dt><dd class="col-sm-9">' + subs[sub] + '</dd>');
	}
	return '<dl class="row">' + result.join("") + "</dl>";
	}

function populate(event) {
	var target = $(this);
	if (target.hasClass('populated')) {
		target.children('.card-body').toggle();
		return false;
	}
	var spell_id = this.id;
	var spell_data = data[spell_id];
	target.append('<div class="card-body">' +
		'<ul class="list-inline">' +
			property_tags(spell_data) +
		'</ul>' +
		'<p>' + spell_data.description.main + '</p>' +
		subsections(spell_data) +
	'</div>');
	target.addClass('populated');
}