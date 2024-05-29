'use client';
import React, { useEffect } from 'react';
import { Box, TableCell, TableSortLabel } from '@mui/material';
import { Header, flexRender } from '@tanstack/react-table';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupColumnIcon from '@mui/icons-material/MergeType';
import UngroupColumnIcon from '@mui/icons-material/CallSplit';
import { TextField } from '../form';

export interface HeaderCellProps<Data> {
  header: Header<Data, unknown>;
}

export function HeaderCell<Data>(
  props: HeaderCellProps<Data>
): React.ReactElement {
  const [showSearch, setShowSearch] = React.useState(false);
  const { header } = props;

  useEffect(() => {
    if (!showSearch) {
      header.column.setFilterValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch]);

  const sortDirection = header.column.getIsSorted();
  const canBeGrouped = header.column.getCanGroup();
  const fitlerable = header.column.getCanFilter();
  const GroupIcon = header.column.getIsGrouped()
    ? UngroupColumnIcon
    : GroupColumnIcon;
  return (
    <TableCell key={header.id} sortDirection={sortDirection}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TableSortLabel
          active={header.column.getIsSorted() !== false}
          direction={sortDirection === false ? undefined : sortDirection}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </TableSortLabel>
        {fitlerable && (
          <FilterListIcon
            fontSize="small"
            sx={{
              ml: 1,
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          />
        )}
        {canBeGrouped && (
          <GroupIcon
            fontSize="small"
            sx={{
              ml: 1,
              cursor: 'pointer',
            }}
            onClick={header.column.getToggleGroupingHandler()}
          />
        )}
      </Box>
      {showSearch && (
        <TextField
          autoFocus
          placeholder="Search..."
          fullWidth
          value={header.column.getFilterValue()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSearch(false);
            }
          }}
          onChange={(e) => {
            header.column.setFilterValue(e.target.value);
          }}
        />
      )}
    </TableCell>
  );
}
