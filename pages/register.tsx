import Layout from '@/components/layout/Layout';
import Section from '@/components/layout/Section';
import useClasses from '@/lib/hooks/useClasses';
import useInPersonDates from '@/lib/hooks/useInPersonDates';
import { Box, Button, Container, Select, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FieldValues = {
  date: string;
  inPerson: boolean;
};

const Register = () => {
  const [inPerson, setInPerson] = useState(false);
  const [online, setOnline] = useState(false);
  const { dates, isLoading } = useInPersonDates();
  const { classes } = useClasses();
  const { register, handleSubmit, control } = useForm<FieldValues>();
  const router = useRouter();

  const onInPersonSubmit = async (data: FieldValues) => {
    const res = await fetch('/api/classes/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, inPerson: true }),
    });

    const json = await res.json();

    if (json.ok) {
      router.push('/myclass');
    }
  };

  const onOnlineSubmit = async (data: FieldValues) => {
    const res = await fetch('/api/classes/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, inPerson: false }),
    });

    const json = await res.json();

    if (json.ok) {
      router.push('/myclass');
    }
  };

  return (
    <Layout>
      <Section>
        <Container maxWidth="lg">
          <Box
            sx={{
              py: 10,
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Register for classes
            </Typography>
            <Typography sx={{ mb: 4 }}>Choose delivery type</Typography>
            <Box sx={{ dipslay: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                sx={{ mr: 5 }}
                onClick={() => {
                  setOnline(true);
                  setInPerson(false);
                }}
              >
                Online
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setInPerson(true);
                  setOnline(false);
                }}
              >
                In Person
              </Button>
            </Box>
            <Box>
              {online && (
                <Box
                  component="form"
                  sx={{ mt: 5 }}
                  onSubmit={handleSubmit(onOnlineSubmit)}
                >
                  <Typography>
                    The learning materials will be delivered to your email
                    address and can be accessed here.
                  </Typography>
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Register
                  </Button>
                </Box>
              )}
              {inPerson && isLoading && <Typography>Loading...</Typography>}
              {inPerson && classes && classes.length > 0 && (
                <Box
                  component="form"
                  sx={{ mt: 5 }}
                  onSubmit={handleSubmit(onInPersonSubmit)}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Select dates
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          native
                          variant="outlined"
                          sx={{ width: '100%' }}
                          {...field}
                        >
                          {classes.map((classItem, i) => (
                            <option key={i} value={classItem.courseId}>
                              {new Date(classItem.date || '').toLocaleString()}
                            </option>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
};

// if no sid cookie, redirect to '/signup'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const { sid } = req.cookies;

  if (!sid) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
