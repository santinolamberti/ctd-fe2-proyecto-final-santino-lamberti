import { fireEvent, screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { render } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { NO_ENCONTRADO, NOMBRE_INVALIDO, MENSAJE_CARGANDO } from "./constants";

describe("Cita", () => {
  describe("renderización del componente", () => {
    test("cita vacía", async () => {
      render(<Cita />);
      const cita = screen.queryByText(NO_ENCONTRADO);
      expect(cita).toBeInTheDocument();
    });
  });

  describe("ejecución de query", () => {
    test("renderizar el mensaje de cargando", async () => {
      render(<Cita />);

      const button = screen.queryByText("Obtener cita aleatoria");
      if (button) fireEvent.click(button);

      await waitFor(() => {
        const mensajeCargando = screen.queryByText(MENSAJE_CARGANDO);
        expect(mensajeCargando).toBeInTheDocument();
      });
    });
  });

  describe("se llena el input", () => {
    test('Deberia cambiar la label del boton a "Obtener Cita"', async () => {
      render(<Cita />);

      const input = screen.queryByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      if (input) userEvent.type(input, "a");

      await waitFor(() => {
        const buttonCita = screen.queryByText("Obtener Cita");
        expect(buttonCita).toBeInTheDocument();
      });

      await waitFor(() => {
        const buttonCitaAleatoria = screen.queryByText(
          "Obtener cita aleatoria"
        );
        expect(buttonCitaAleatoria).not.toBeInTheDocument();
      });
    });

    test("Actualizar el valor del input por el valor ingresado", async () => {
      render(<Cita />);

      const input = screen.queryByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      if (input) userEvent.type(input, "Marge");

      await waitFor(() => {
        expect(input).toHaveValue("Marge");
      });
    });
  });

  describe("Se vacía el contenido del input", () => {
    test("No deberia mostrarse ninguna cita", async () => {
      render(<Cita />);

      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "bart" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText("Bart Simpson")).toBeInTheDocument();
      const buttonBorrar = screen.getByLabelText("Borrar");
      userEvent.click(buttonBorrar);
      expect(await screen.findByText(NO_ENCONTRADO)).toBeInTheDocument();
    });

  });

  describe("ejecución correcta de la query", () => {
    test("renderizar cita del personaje ingresado", async () => {
      render(<Cita />);
      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "homer" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText("Homer Simpson")).toBeInTheDocument();
    });
  });

  describe("ejecución erronea de la query", () => {
    test("Renderizar mensaje de error", async () => {
      render(<Cita />);
      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "afsd" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText(NOMBRE_INVALIDO)).toBeInTheDocument();
    });
  });
});