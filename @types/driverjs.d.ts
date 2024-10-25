declare module "driver.js" {
  interface DriverOptions {
    animate?: boolean;
    opacity?: number;
    doneBtnText?: string;
    closeBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    highlight?: () => void;
    showProgress?: boolean;
    steps?: { element: string; popover: { title: string; description: string; } }[];
    // drive() : void
  }

  interface Step {
    element: string;
    popover: {
      title: string;
      description: string;
      position?: string;
    };
  }

  function driver(options?: DriverOptions): {
    defineSteps(steps: Step[]): void;
    drive(): void;
  };

  export { driver };
}
