import { cmd } from "./cmd"
import open from "open"
import * as prompts from "@clack/prompts"
import { UI } from "../ui"

const REPO = "anomalyco/opencode"

export const IssueCommand = cmd({
  command: "issue",
  describe: "open a GitHub issue in your browser",
  builder: (yargs) =>
    yargs
      .option("bug", {
        describe: "open a bug report",
        type: "boolean",
      })
      .option("feature", {
        describe: "open a feature request",
        type: "boolean",
      }),
  handler: async (args: { bug?: boolean; feature?: boolean }) => {
    UI.empty()
    prompts.intro("Open Issue")

    let template: string | undefined
    if (args.bug) template = "bug-report.yml"
    else if (args.feature) template = "feature-request.yml"

    const url = template
      ? `https://github.com/${REPO}/issues/new?template=${template}`
      : `https://github.com/${REPO}/issues/new/choose`

    prompts.log.info("Opening: " + url)
    await open(url).catch(() => {
      prompts.log.warn("Could not open browser. Please visit: " + url)
    })

    prompts.outro("Done")
  },
})
