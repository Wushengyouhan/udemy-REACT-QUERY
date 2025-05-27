import { AllStaff } from "../AllStaff";

import { render, screen } from "@/test-utils";

test("renders response from query", async () => {
  // write test here
  render(<AllStaff />);
  const staffNames = await screen.findAllByRole("heading", {
    name: /sandra|divya|mateo|michael/i,
  });

  expect(staffNames).toHaveLength(4);
});
