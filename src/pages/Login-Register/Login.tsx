import { logStore } from "../../store/logStore";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { AiFillGooglePlusSquare, AiFillTwitterSquare } from "react-icons/ai";
import { Item, useStore } from "../../store/store";

const Login = ({ page }: { page: string }) => {
  const logStorage: any = logStore();
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const checkUser = () => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        data.map((user: any) => {
          console.log(user);
          if (
            user.username === form.values.username &&
            user.password === form.values.password
          ) {
            logStorage.setUser(user);
            logStorage.setLog(true);
            navigate(`/${page}`);
            console.log("Welcome Back!");
          } else {
            console.log("User not found");
          }
        });
      });
  };

  return (
    <Flex
      direction={{ base: "row", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
    >
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Inventerror, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            rightIcon={<AiFillGooglePlusSquare size={20} />}
            variant="outline"
            color="red"
          >
            {" "}
            Google{" "}
          </Button>
          <Button
            rightIcon={<AiFillTwitterSquare size={20} />}
            variant="outline"
            color="blue"
          >
            {" "}
            Twitter{" "}
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === "register" && (
              <>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                />
              </>
            )}

            <TextInput
              required
              label="Username"
              placeholder="cosoforte"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" onClick={() => checkUser()}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
};

export default Login;
