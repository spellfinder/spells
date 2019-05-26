import React from 'react';

import DefinitionList from './DefinitionList';
import Table from './Table';
import List from './List';


function Subsection(props) {
	if (props.dataType === 'dl') {
		return <DefinitionList content={props.content} />
	} else if (props.dataType === 'table') {
		return <Table content={props.content} />
	} else if (props.dataType === 'list') {
		return <List content={props.content} />
	}
}

export default Subsection;