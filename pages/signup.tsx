import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';

const steps = ['Basic info', 'Detailed info', 'Consents info'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }}>
      {/* sx={{ display: 'flex', alignItems: 'center', minHeight: 40 }} */}
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Container>

      {activeStep === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack spacing={4}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="first-name"
                label="First name"
                variant="standard"
                required
              />
              <TextField
                id="last-name"
                label="Last name"
                variant="standard"
                required
              />
            </Stack>
            <Stack direction="row">
              <TextField
                id="address"
                label="Address line 1"
                variant="standard"
                required
              />
            </Stack>
            <Stack direction="row">
              <TextField
                id="address2"
                label="Address line 2"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField id="city" label="City" variant="standard" required />
              <TextField
                id="province"
                label="Province"
                variant="standard"
                required
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id="postalcode"
                label="Postal code"
                variant="standard"
                required
              />
              <TextField
                id="country"
                label="Country"
                variant="standard"
                required
              />
            </Stack>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          margin: 1,
          marginTop: 5,
          color: 'black',
        }}
      >
        {activeStep === 1 && (
          <Stepper activeStep={1}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel
                    sx={{ color: 'black' }}
                    id="demo-radio-buttons-group-label"
                    color="primary"
                  >
                    Do you give us permission for us to email or text you for
                    appointments or to arrange a home visit?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <FormLabel
                    sx={{ color: 'black' }}
                    id="demo-radio-buttons-group-label"
                    color="primary"
                  >
                    Do you give us permission to fax completion of classes to
                    Brighter Futures or Integrated Family Services?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <FormLabel
                    sx={{ color: 'black' }}
                    id="demo-radio-buttons-group-label"
                    color="primary"
                  >
                    Have you received your prenatal books from the Primary Care
                    Network?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <FormLabel
                    sx={{ color: 'black' }}
                    id="demo-radio-buttons-group-label"
                    color="primary"
                  >
                    Have you completed Prenatal Classes Before?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
          </Stepper>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          margin: 1,
          color: 'black',
        }}
      >
        {activeStep === 2 && (
          <Stepper activeStep={2}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={2}>
                <FormGroup>
                  <FormLabel
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'left',
                      marginLeft: 0,
                      marginTop: 1,
                      color: 'black',
                    }}
                  >
                    Where will you be involved in the voucher/grocery program?
                  </FormLabel>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Integrated Family Services"
                    sx={{ color: 'black', marginLeft: 3, marginTop: 2 }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Ermineskin Brighter Futures"
                    sx={{ color: 'black', marginLeft: 3 }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Louis Bull Brighter Futures"
                    sx={{ color: 'black', marginLeft: 3 }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Pigeon Lake CPNP Program"
                    sx={{ color: 'black', marginLeft: 3 }}
                  />
                  <FormLabel
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'left',
                      marginLeft: 0,
                      marginTop: 2,
                      color: 'black',
                    }}
                  >
                    Prenatal Course Type:
                  </FormLabel>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Online"
                    sx={{ color: 'black', marginLeft: 3 }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="In Person"
                    sx={{ color: 'black', marginLeft: 3 }}
                  />
                </FormGroup>
              </Stack>
            </Stack>
          </Stepper>
        )}
      </Box>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
