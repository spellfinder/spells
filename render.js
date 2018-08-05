var filter_map = {
	level_min: 0,
	level_max: 10
};
var data = {};
var by_list = {};

$.getJSON("./all.json", null, function(json_data, status) {
	data = json_data;
	for (k in data) {
		var o = data[k]
		$("#spell-list").append(
			'<li class="row justify-content-center list-group-item list-group-item-action spellcard" id="' + k +
			'"><h5>' + o.name +
			' <span class="badge badge-dark">' + o.type.toLowerCase() + ' ' + o.level + '</span></h5></li>'
		);
	}
	$(".spellcard").on('click', populate);
	$(".filters").on('change', update_filters);
	$('#name_filter').keyup(update_filters);
});

$.getJSON("./by-list.json", null, function(json_data, status) {
	by_list = json_data;
	for (list in by_list) {
		$('#list_filter').append('<option value="' + list +'">' + list + '</option>');
	}
})

function update_filters() {
	filter_map.level_min = $('#levelfilter_min').val();
	filter_map.level_max = $('#levelfilter_max').val();
	filter_map.name = $('#name_filter').val();
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
		if (data[k].name.toLowerCase().indexOf(filter_map.name.toLowerCase()) < 0) {
			$("#" + k).hide();
			continue;
		}
		$("#" + k).show();
	}
}

function translate_casting(casting) {
	var items = casting.map(function(item) {
		return item.replace(
			'a', '[[A]] '
		).replace(
			'f', '[[F]] '
		).replace(
			'r', '[[R]] '
		)
	})
	return items.join(', ')
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

	result.push('<strong>casting</strong>: ' + translate_casting(spell_data.casting))
	return result.map(function(item) { return '<li class="list-inline-item">' + item + '</li>'; }).join("");
}

function translate_subsection_title(sub) {
	var translator = {
		'crit-fail': 'Critical Failure',
		'crit': 'Critical Success',
		'success': 'Success',
		'failure': 'Failure'
	}

	if (translator.hasOwnProperty(sub)) {
		return translator[sub];
	}
	return sub;
}

function subsections(spell_data) {
	if (!spell_data.description.subsections) {
		return ''
	}
	var result = [];
	var subs = spell_data.description.subsections

	for (sub in subs) {
		var title = translate_subsection_title(sub);
		result.push('<dt class="col-sm-3">' + title + '</dt><dd class="col-sm-9">' + subs[sub] + '</dd>');
	}
	return '<dl class="row">' + result.join("") + "</dl>";
	}

function populate(event) {
	var target = $(this);
	if (target.hasClass('populated')) {
		target.children('.spell-detail').toggle();
		return false;
	}
	var spell_id = this.id;
	var spell_data = data[spell_id];
	target.append('<div class="spell-detail">' +
		'<ul class="list-inline">' +
			property_tags(spell_data) +
		'</ul>' + '<hr></hr>' +
		'<p>' + spell_data.description.main + '</p>' +
		subsections(spell_data) +
	'</div>');
	target.addClass('populated');
}