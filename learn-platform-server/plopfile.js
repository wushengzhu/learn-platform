const path = require('path');

module.exports = (plop) => {
  plop.setGenerator('module', {
    description: 'Create a new module with service, resolver, and DTOs',
    prompts: [
      // npx plop
      {
        type: 'input',
        name: 'name',
        message: '请输入模型的名字',
      },
    ],
    actions: [
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/temp.module.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/{{kebabCase name}}.service.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/temp.service.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/{{kebabCase name}}.resolver.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/temp.resolver.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/dto/{{kebabCase name}}.input.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/dto/temp.input.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/dto/{{kebabCase name}}.type.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/dto/temp.type.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/dto/result-{{kebabCase name}}.output.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/dto/result-temp.output.hbs',
        ),
      },
      {
        type: 'add',
        path: path.join(
          __dirname,
          'src/modules/{{kebabCase name}}/models/{{kebabCase name}}.entity.ts',
        ),
        templateFile: path.join(
          __dirname,
          'plopTemplates/module/models/temp.entity.hbs',
        ),
      },
      {
        type: 'modify',
        path: './src/app.module.ts',
        pattern: /import { Module } from '@nestjs\/common';/g,
        template:
          "import { Module } from '@nestjs/common';\nimport { {{pascalCase name}}Module } from './modules/{{kebabCase name}}/{{kebabCase name}}.module';",
      },
      {
        type: 'modify',
        path: './src/app.module.ts',
        pattern: /imports: \[([\s\S]*?)\](?=\s*,\s*controllers)/g,
        template: 'imports: [$1  {{pascalCase name}}Module,\n  ]',
      },
    ],
  });
};
