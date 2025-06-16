import constant from '@/constants/constant';
import {
    Sandpack,
    SandpackCodeEditor,
    SandpackLayout,
    SandpackProvider,
    SandpackPreview,
} from '@codesandbox/sandpack-react';
import { aquaBlue } from '@codesandbox/sandpack-themes';

const Codeeditor = ({ codeResp, isReady }: { codeResp: string; isReady: boolean }) => {
    const editorHeight = '80vh'; // unified height
    return (
        <div>
            {isReady ? (
                <Sandpack
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                        showNavigator: true,
                        showTabs: true,
                        editorHeight: editorHeight,
                    }}
                    customSetup={{
                        dependencies: {
                            ...constant.DEPENDANCY,
                        },
                    }}
                    template="react"
                    theme={aquaBlue}
                    files={{
                        '/App.js': `${codeResp}`,
                    }}
                    
                />
            ) : (
                <SandpackProvider
                    template="react"
                    theme={aquaBlue}
                    files={{
                        '/App.ts': {
                            code: `${codeResp}`,
                            active: true,
                        },
                    }}
                    customSetup={{
                        dependencies: {
                            ...constant.DEPENDANCY,
                        },
                    }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                    }}
                >
                    <SandpackLayout style={{ height: '100vh' }}>
                        <SandpackCodeEditor showTabs={true} style={{ height: '100%' }} />
                        <SandpackPreview style={{ height: '100%' }} />
                    </SandpackLayout>
                </SandpackProvider>
            )}
        </div>
    );
};

export default Codeeditor;
