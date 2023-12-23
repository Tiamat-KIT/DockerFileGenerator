'use client';

import { SubmitDataType } from '@/type/SubmitData';
import { useCallback } from 'react';

export default function ViewDockerFile({ Datus }: { Datus: SubmitDataType }) {
  const FROM_OS = useCallback(({ OS }: { OS: SubmitDataType['OS'] }) => {
    return (
      <pre>
        <code>FROM {OS !== null ? (OS as string) : ('' as string)}:latest</code>
      </pre>
    );
  },[Datus.OS])

  const Install_Lang = useCallback(({ Lang }: { Lang: SubmitDataType['Lang'] }) => {
    if (Lang === 'Rust') {
      return (
        <>
          <pre>
            <code>RUN apt-get update &amp;&amp; \</code>
          </pre>
          <pre>
            <code>
              apt-get install -y curl gcc libssl-dev wget pkg-config
              build-essential &amp;&amp; \
            </code>
          </pre>
          <pre>
            <code>apt-get clean &amp;&amp; \</code>
          </pre>

          <pre>
            <code>rm -rf /var/lib/apt/lists/*</code>
          </pre>

          <pre>
            <code>
              RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
              -s -- -y ENV PATH=&quot;/root/.cargo/bin:$&#x7b;PATH&#x7d;&quot;
            </code>
          </pre>
          <br />
        </>
      );
    }
    return <></>;
  },[Datus.Lang])

  const Install_PackageManager = useCallback(({
    PackageManager,
  }: {
    PackageManager: SubmitDataType['PackageManager'];
  }) => {
    if (PackageManager === 'npm' || 'yarn') {
      return (
        <>
          <pre>
            <code>RUN apt install -y nodejs npm &amp;&amp; \</code>
          </pre>
          <pre>
            <code>npm install n -g &amp;&amp; \</code>
          </pre>
          <pre>
            <code>n stable &amp;&amp; \</code>
          </pre>
          <pre>
            <code>apt purge -y nodejs npm &amp;&amp; \</code>
          </pre>
          <pre>
            <code>apt autoremove -y &amp;&amp; \</code>
          </pre>
          {PackageManager === 'yarn' ? (
            <pre>
              <code>npm install yarn -g</code>
            </pre>
          ) : (
            <></>
          )}
          <br />
        </>
      );
    }
    return <br />;
  },[Datus.PackageManager])

  const SetupFrameWork = useCallback(({
    FrameWork,
    PackageManager,
    Language,
  }: {
    FrameWork: SubmitDataType['FrameWork'];
    PackageManager: SubmitDataType['PackageManager'];
    Language: SubmitDataType['Lang'];
  }) => {
    if (FrameWork === 'Next.js') {
      return (
        <pre>
          <code>
            RUN{' '}
            {PackageManager === 'npm'
              ? `npx create-next-app@latest my-app ${
                  Language === 'TypeScript' ? '--ts' : '--js'
                }`
              : ''}
            {PackageManager === 'yarn'
              ? `yarn create next-app my-app ${
                  Language === 'TypeScript' ? '--ts' : '--js'
                }`
              : ''}
          </code>
        </pre>
      );
    }
    return <br />;
  },[Datus.FrameWork])

  const CopyButton = () => {
    return (
      <button
        className="btn"
        onClick={() => {
          navigator.clipboard
            .writeText(document.getElementById('dockerfile')!.innerText)
            .then(() => alert('Start DevContainer!'));
        }}
      >
        Copy
      </button>
    );
  };
  return (
    <div className="container mx-auto px-5">
      <div className="mockup-code bg-white" id="dockerfile">
        <FROM_OS OS={Datus.OS} />
        <br />

        <Install_Lang Lang={Datus.Lang} />
        <Install_PackageManager PackageManager={Datus.PackageManager} />
        <SetupFrameWork
          PackageManager={Datus.PackageManager}
          FrameWork={Datus.FrameWork}
          Language={Datus.Lang}
        />
      </div>
      <CopyButton />
    </div>
  );
}
