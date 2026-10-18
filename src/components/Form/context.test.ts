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

  it("accepts undefined for optional booleans", () => {
    const schema = buildZodSchemaFromRules("boolean", {});
    expect(schema.safeParse(undefined).success).toBe(true);
    expect(schema.safeParse(false).success).toBe(true);
  });

  it("uses the custom required message when a boolean is undefined", () => {
    const schema = buildZodSchemaFromRules("boolean", {
      required: "You must accept the terms",
    });
    const result = schema.safeParse(undefined);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("You must accept the terms");
    }
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

  it("allows empty string for optional strings with minLength/pattern", () => {
    const otp = buildZodSchemaFromRules("string", {
      minLength: { value: 6, message: "Enter all 6 digits" },
      maxLength: 6,
    });
    expect(otp.safeParse("").success).toBe(true);
    expect(otp.safeParse(undefined).success).toBe(true);
    expect(otp.safeParse("123").success).toBe(false);
    expect(otp.safeParse("123456").success).toBe(true);

    const color = buildZodSchemaFromRules("string", {
      pattern: { value: /^#([0-9a-fA-F]{6})$/, message: "bad color" },
    });
    expect(color.safeParse("").success).toBe(true);
    expect(color.safeParse("#ff0000").success).toBe(true);
    expect(color.safeParse("red").success).toBe(false);
  });

  it("allows 0 for optional numbers without a min bound", () => {
    const rating = buildZodSchemaFromRules("number", { max: 5 });
    expect(rating.safeParse(0).success).toBe(true);
    expect(rating.safeParse(undefined).success).toBe(true);
    expect(rating.safeParse(6).success).toBe(false);
  });
});
