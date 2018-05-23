import React from 'react';
import {grey500} from 'material-ui/styles/colors';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up'
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

export function renderSortIcon(newSortColumn, currentSortColumn, currentSortDir) {
    return (
        currentSortColumn === newSortColumn
            ? (
                currentSortDir === 'asc' ? <UpArrow style={{color: grey500}}/> : <DownArrow style={{color: grey500}}/>
            ) : null
    )
}

export function renderSortableColumn(title, newSortColumn, func, currentSortColumn, currentSortDir){
    return (
        <div onClick={() => func(newSortColumn)}
             style={{display: 'flex',  alignItems: 'center', cursor: 'pointer'}}>
            {title}
            { renderSortIcon(newSortColumn, currentSortColumn, currentSortDir)}
        </div>
    )
}