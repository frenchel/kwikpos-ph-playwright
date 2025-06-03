import type {
  Reporter,
  TestCase,
  TestResult,
  Suite,
} from "@playwright/test/reporter";

class KwikPOSReporter implements Reporter {
  onBegin(config, suite: Suite) {
    console.log(
      `🚀 Starting the test run with ${suite.allTests().length} test(s)...`
    );
  }

  onTestBegin(test: TestCase) {
    console.log(`🧪 Running test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const statusEmoji =
      result.status === "passed"
        ? "✅"
        : result.status === "failed"
        ? "❌"
        : "⚠️";
    console.log(
      `${statusEmoji} ${test.title} — ${result.status.toUpperCase()}`
    );
    if (result.status === "failed" && result.error) {
      console.log(`   ↪️ ${result.error.message}`);
    }
  }

  onEnd(result) {
    console.log(
      `🏁 Test run complete. Overall status: ${result.status.toUpperCase()}`
    );
  }
}

export default KwikPOSReporter;
