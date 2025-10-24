const parseEnv = () => {
  const env = process.env;
  
  const result = Object.keys(env)
    .filter((key) => key.startsWith('RSS_'))
    .map((key) => `${key}=${env[key]}`);
  
  console.log(result.join('; '))
};

parseEnv();
