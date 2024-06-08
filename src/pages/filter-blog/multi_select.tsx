import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { ICategory } from '../../interfaces/model/category'

interface Props {
  categories: ICategory[]
  selectedCategoryIds: string[]
  setSelectedCategoryIds: any
}

export default function MultipleSelectChip({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}: Props) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setSelectedCategoryIds(
      // // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          className="bg-white"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCategoryIds}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Chip"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={categories.find((cate) => cate.id == value)?.name}
                />
              ))}
            </Box>
          )}>
          {categories.map((cate) => (
            <MenuItem
              key={cate.id}
              value={cate.id}>
              {cate.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
