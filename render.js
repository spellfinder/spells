var filter_map = {
	level_min: 0,
	level_max: 10,
	name: "",
	list: "",
	type: "",
};
var data = {};
var by_list = {};

function capitalize(str) {
	words = str.split(' ');
	words = words.map(function(word) { return word[0].toUpperCase() + word.substr(1).toLowerCase(); });
	return words.join(' ');
}

function update_filters() {
	filter_map.level_min = $('#levelfilter_min').val();
	filter_map.level_max = $('#levelfilter_max').val();
	filter_map.name = $('#name_filter').val();
	filter_map.list = $("#list_filter").val();
	filter_map.type = $('#type_filter').val();
	filter_list();
	return false;
}

function filter_list() {
	function hide(k) {
		return $("#" + k).hide();
	}
	for (k in data) {
		level = data[k].level
		if (level < filter_map.level_min || level > filter_map.level_max) {
			hide(k);
			continue;
		}
		if (data[k].name.toLowerCase().indexOf(filter_map.name.toLowerCase()) < 0) {
			hide(k);
			continue;
		}
		if (filter_map.list && by_list[filter_map.list].indexOf(k) < 0) {
			hide(k);
			continue;
		}
		if (filter_map.type && filter_map.type != data[k].type.toLowerCase()) {
			hide(k);
			continue;
		}
		$("#" + k).show();
	}
}

function translate_casting(casting) {
	var items = casting.map(function(item) {
		return item.replace(
			/^a/, '[[A]] '
		).replace(
			/^f/, '[[F]] '
		).replace(
			/^r/, '[[R]] '
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

function render_subsections(spell_data) {
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

function render_table(spell_data) {
	if (!spell_data.table) {
		return ''
	}
	var headers = spell_data.table.headers;
	var rows = spell_data.table.rows;

	var result = '<table class="table table-striped table-sm">';
	if (headers) {
		result += '<thead><tr>';
		for (let h of headers) {
			result += '<th scope="col">' + h + '</th>';
		}
		result += '</tr></thead>'
	}
	result += '<tbody>';
	for (let row of rows) {
		result += '<tr>';
		for (let cell of row) {
			result += '<td>' + cell + '</td>';
		}
		result += '</tr>'
	}
	return result + '</tbody></table>'
}

function format_text(txt) {
	return txt.replace(/ [-•] /g, '<br /> - ');
}

function render_traits(traits) {
	result = '';
	for (trait of traits) {
		result += '<li class="badge badge-info trait-badge mr-1">' + trait + '</li>';
	}
	return result;
}

function render_heighten(data) {
	if (!data.heightened) {
		return '';
	}
	var result = '<hr></hr><dl class="row"><dt class="col-sm-3">Heightened</dt><dd class="col-sm-9"> - </dd>';
	for (k in data.heightened) {
		result += '<dt class="col-sm-3">' + k + '</dt><dd class="col-sm-9">' + data.heightened[k] + '</dd>';
	}
	return result + '</dl>'
}

function populate(event) {
	var spell_id = $(this).data('spellid');
	var target = $('#' + spell_id);
	if (target.hasClass('populated')) {
		target.children('.spell-detail').toggle();
		return false;
	}
	var spell_data = data[spell_id];
	target.append('<div class="spell-detail">' +
		'<ul class="list-inline">' +
			render_traits(spell_data.traits) +
			property_tags(spell_data) +
		'</ul>' + '<hr></hr>' +
		'<p>' + format_text(spell_data.description.main) + '</p>' +
		render_table(spell_data) +
		render_subsections(spell_data) +
		render_heighten(spell_data) +
	'</div>');
	target.addClass('populated');
}

$(document).ready(function() {
	$.getJSON("data/all.json", null, function(json_data, status) {
		data = json_data;
		for (k in data) {
			var o = data[k]
			$("#spell-list").append(
				'<li class="row justify-content-center list-group-item list-group-item-action spellcard" id="' + k +
				'"><h5 data-spellid="' + k + '" class="spellcard-header">' + capitalize(o.name) +
				' <span class="badge badge-dark">' + capitalize(o.type) + ' ' + o.level + '</span></h5></li>'
			);
		}
		$(".spellcard-header").on('click', populate);
		$(".filters").on('change', update_filters);
		$('#name_filter').keyup(update_filters);
	});

	$.getJSON("data/by-list.json", function(json_data, status) {
		by_list = json_data;
		for (list in by_list) {
			$('#list_filter').append('<option value="' + list +'">' + capitalize(list) + '</option>');
		}
	});
})
