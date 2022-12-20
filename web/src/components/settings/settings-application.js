import { Box, Button, Card, CardContent, CardHeader, Divider, InputAdornment, Stack, TextField } from '@mui/material';
import { settings } from '../../__mocks__/settings';

export const SettingsApplication = (props) => {
  const language = [
    {
      value: 'en_US',
      label: 'English US',
    },
  ];

  return (
    <form>
      <Card>
        <CardHeader subheader="Update application settings" title="Application" />
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <TextField
              label="Language"
              name="language"
              required
              select
              SelectProps={{ native: true }}
              defaultValue={settings.language}
              variant="outlined"
              helperText="Application language specify the user role"
            >
              {language.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              label="Maximum Radius From Point"
              margin="normal"
              name="oldPassword"
              type="number"
              defaultValue={settings.maxRadius}
              variant="outlined"
              helperText="Maximum distance from distribution route"
              InputProps={{
                endAdornment: <InputAdornment position="end">meters</InputAdornment>,
              }}
            />

            <TextField
              label="Max Points Per Route"
              margin="normal"
              name="oldPassword"
              type="number"
              defaultValue={settings.maxPointsPerRoute}
              variant="outlined"
              helperText="Maximum distribution points per distribution route"
            />
          </Stack>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Change Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};
