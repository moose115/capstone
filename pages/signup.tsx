import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  TextField as _TextField,
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import Section from '@/components/layout/Section';
import { Controller, useForm } from 'react-hook-form';

const TextField = styled(_TextField)(({ theme }) => ({
  width: '100%',
}));

const steps = ['Basic info', 'Detailed info', 'Consents'];

const Signup = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Layout>
      <Section>
        <Container maxWidth="sm">
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
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

            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        required
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        required
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        id="first-name"
                        label="First name"
                        variant="outlined"
                        required
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        id="last-name"
                        label="Last name"
                        variant="outlined"
                        required
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Address line 1"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    label="Address line 2"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="province"
                    label="Province"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="postalcode"
                    label="Postal code"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="country"
                    label="Country"
                    variant="outlined"
                    required
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="contact-consents">
                      Do you give us permission for us to email or text you for
                      appointments or to arrange a home visit?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="contact-consents"
                      name="contact-consents"
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="fax-consents">
                      Do you give us permission to fax completion of classes to
                      Brighter Futures or Integrated Family Services?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="fax-consents"
                      name="fax-consents"
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="books-received">
                      Have you received your prenatal books from the Primary
                      Care Network?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="books-received"
                      name="books-received"
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="classes-completed">
                      Have you completed Prenatal Classes Before?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="classes-completed"
                      name="classes-completed"
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
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>
                      Where will you be involved in the voucher/grocery program?
                    </FormLabel>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Integrated Family Services"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Ermineskin Brighter Futures"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Louis Bull Brighter Futures"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Pigeon Lake CPNP Program"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            )}

            {activeStep === steps.length ? (
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <>
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
                  <Button
                    onClick={handleNext}
                    type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Section>
    </Layout>
  );
};

export default Signup;
