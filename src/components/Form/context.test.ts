import { describe, expect, it } from "vitest";
import { z } from "zod";
import { buildZodSchemaFromRules } from "./context";

describe("buildZodSchemaFromRules", () => {
  it("requires non-empty strings when required", () => {
    const schema = buildZodSchemaFromRules("string", { required: true });
    expect(schema.safeParse("").success).toBe(false);
    expect(schema.safeParse(undefined).success).toBe(false);
    expect(schema.safeParse("hello").success).toBe(true);
  });

  it("uses custom required messages", () => {
    const schema = buildZodSchemaFromRules("string", {
      required: "Please select a country",
    });
    expect(schema.safeParse("").success).toBe(false);
    expect(schema.safeParse("").error?.issues[0]?.message).toBe("Please select a country");
  });

  it("applies custom validate callbacks", async () => {
    const schema = buildZodSchemaFromRules("string", {
      validate: (value) => value === "ok" || "Must be ok",
    });

    await expect(schema.parseAsync("ok")).resolves.toBe("ok");
    await expect(schema.parseAsync("bad")).rejects.toThrow("Must be ok");
  });

  it("validates email and url rules", () => {
    const emailSchema = buildZodSchemaFromRules("string", { email: true, required: true });
    expect(emailSchema.safeParse("bad").success).toBe(false);
    expect(emailSchema.safeParse("user@example.com").success).toBe(true);

    const urlSchema = buildZodSchemaFromRules("string", { url: true, required: true });
    expect(urlSchema.safeParse("not-a-url").success).toBe(false);
    expect(urlSchema.safeParse("https://example.com").success).toBe(true);
  });

  it("validates boolean required as must-be-true", () => {
    const schema = buildZodSchemaFromRules("boolean", { required: true });
    expect(schema.safeParse(false).success).toBe(false);
    expect(schema.safeParse(true).success).toBe(true);
  });

  it("builds a merged object schema from field rules", () => {
    const shape = {
      username: buildZodSchemaFromRules("string", { required: true, minLength: 3 }),
      age: buildZodSchemaFromRules("number", { min: 18 }),
    };
    const schema = z.object(shape);

    expect(schema.safeParse({ username: "ab", age: 20 }).success).toBe(false);
    expect(schema.safeParse({ username: "abc", age: 20 }).success).toBe(true);
  });

  it("coerces date and datetime values", () => {
    const dateSchema = buildZodSchemaFromRules("date", { required: true });
    const datetimeSchema = buildZodSchemaFromRules("datetime", { required: true });
    const instant = new Date("2026-08-13T14:30:00");

    expect(dateSchema.safeParse(instant).success).toBe(true);
    expect(datetimeSchema.safeParse(instant).success).toBe(true);
    expect(datetimeSchema.safeParse(undefined).success).toBe(false);
  });
});
