/// <reference types='cypress' />

const page = {
  toggleAllButton: () => cy.byDataCy('ToggleAllButton'),
  newTodoField: () => cy.byDataCy('NewTodoField'),
  todoList: () => cy.byDataCy('TodoList'),
  todosCounter: () => cy.byDataCy('TodosCounter'),
  clearCompletedButton: () => cy.byDataCy('ClearCompletedButton'),
  footer: () => cy.byDataCy('Footer'),
  localStorage: () => cy.getAllLocalStorage().its('http://localhost:3001'),
  data: () => page.localStorage().then(({ todos = '[]' }) => JSON.parse(todos)),

  visit: initialTodos => {
    cy.visit('/', {
      onBeforeLoad: win => {
        if (initialTodos) {
          win.localStorage.setItem('todos', JSON.stringify(initialTodos));
        }
      },
    });
  },
};

const todos = {
  el: i => cy.byDataCy('Todo').eq(i),
  deleteButton: i => todos.el(i).byDataCy('TodoDelete'),
  statusToggler: i => todos.el(i).byDataCy('TodoStatus'),
  title: i => todos.el(i).byDataCy('TodoTitle'),
  titleField: i => todos.el(i).byDataCy('TodoTitleField'),

  assertCount: length => cy.byDataCy('Todo').should('have.length', length),
  assertTitle: (i, title) => todos.title(i).should('have.text', title),
  assertCompleted: i => todos.el(i).should('have.class', 'completed'),
  assertNotCompleted: i => todos.el(i).should('not.have.class', 'completed'),
};

const FilterLinkKeys = {
  all: 'FilterLinkAll',
  active: 'FilterLinkActive',
  completed: 'FilterLinkCompleted',
};

const filter = {
  el: () => cy.byDataCy('Filter'),
  link: type => cy.byDataCy(FilterLinkKeys[type]),
  assertVisible: () => filter.el().should('exist'),
  assertHidden: () => filter.el().should('not.exist'),
  assertSelected: type => filter.link(type).should('have.class', 'selected'),
  assertNotSelected: type =>
    filter.link(type).should('not.have.class', 'selected'),
};

let failed = false;

Cypress.on('fail', e => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  describe('Page with no todos', () => {
    beforeEach(() => {
      page.visit();
    });

    it('should have focused NewTodoField', () => {
      page.newTodoField().should('be.focused');
    });

    it('should not have Todos', () => {
      page.todoList().should('not.exist');
      todos.assertCount(0);
    });

    it('should not have Footer', () => {
      page.footer().should('not.exist');
      filter.el().should('not.exist');
      page.clearCompletedButton().should('not.exist');
      page.todosCounter().should('not.exist');
    });

    it('should not have ToggleAllButton', () => {
      page.toggleAllButton().should('not.exist');
    });

    it('should allow to type a new title', () => {
      page.newTodoField().type('First todo');
      page.newTodoField().should('have.value', 'First todo');
    });

    it('should add a not completed todo on Enter', () => {
      page.newTodoField().type('First todo{enter}');

      page.todoList().should('exist');
      todos.assertCount(1);
      todos.assertTitle(0, 'First todo');
      todos.assertNotCompleted(0);
    });

    it('should not have todos in localStorage', () => {
      page.data().should('deep.equal', []);
    });
  });

  describe('Page after adding a first todo', () => {
    beforeEach(() => {
      page.visit();
      page.newTodoField().type('First todo{enter}');
    });

    it('should show TodoList with one active todo', () => {
      page.todoList().should('exist');
      todos.assertCount(1);
      todos.assertTitle(0, 'First todo');
      todos.assertNotCompleted(0);
    });

    it('should show Filter', () => {
      filter.assertVisible();
    });

    it('should show todosCounter', () => {
      page.todosCounter().should('contain.text', '1 item');
    });

    it('should show ToggleAllButton', () => {
      page.toggleAllButton().should('exist');
    });

    it('should not show edit field', () => {
      todos.titleField(0).should('not.exist');
    });

    it('should save todos to localStorage in JSON', () => {
      page.localStorage().should('have.keys', 'todos');

      page.data().then(todos => {
        expect(todos).to.be.instanceOf(Array);
        expect(todos).to.have.length(1);
        expect(todos[0].title).to.equal('First todo');
        expect(todos[0].completed).to.be.false;
      });
    });
  });

  describe('Page with mixed todos', () => {
    beforeEach(() => {
      cy.fixture('todos').then(page.visit);
    });

    it('should have todos loaded from localStorage', () => {
      page.todoList().should('exist');
      todos.assertCount(5);
    });

    it('should have NewTodoField', () => {
      page.newTodoField().should('exist');
    });

    it('should have delete buttons for every todo', () => {
      todos.deleteButton(0).should('exist');
      todos.deleteButton(1).should('exist');
      todos.deleteButton(2).should('exist');
      todos.deleteButton(3).should('exist');
      todos.deleteButton(4).should('exist');
    });

    it('should not show edit fields', () => {
      todos.titleField(0).should('not.exist');
      todos.titleField(1).should('not.exist');
      todos.titleField(2).should('not.exist');
      todos.titleField(3).should('not.exist');
      todos.titleField(4).should('not.exist');
    });

    it('should have correct todo titles', () => {
      todos.assertTitle(0, 'HTML');
      todos.assertTitle(1, 'CSS');
      todos.assertTitle(2, 'JS');
      todos.assertTitle(3, 'TypeScript');
      todos.assertTitle(4, 'React');
    });

    it('should higlight all completed todos', () => {
      todos.assertCompleted(0);
      todos.assertCompleted(1);
      todos.assertCompleted(2);
    });

    it('should not higlight not completed todos', () => {
      todos.assertNotCompleted(3);
      todos.assertNotCompleted(4);
    });

    it('should have correct completed statuses', () => {
      todos.statusToggler(0).should('be.checked');
      todos.statusToggler(1).should('be.checked');
      todos.statusToggler(2).should('be.checked');
      todos.statusToggler(3).should('not.be.checked');
      todos.statusToggler(4).should('not.be.checked');
    });

    it('should have Filter', () => {
      filter.assertVisible();
    });

    it('should have todosCounter with a number of not completed todos', () => {
      page.todosCounter().should('have.text', '2 items left');
    });

    it('should have clearCompletedButton', () => {
      page.clearCompletedButton().should('exist');
    });
  });

  describe('Filtering', () => {
    describe('with mixed todos', () => {
      beforeEach(() => {
        cy.fixture('todos').then(page.visit);
      });

      it('should have only filterLinkAll active', () => {
        filter.assertSelected('all');
        filter.assertNotSelected('active');
        filter.assertNotSelected('completed');
      });

      it('should allow to select the active filter', () => {
        filter.link('active').click();

        filter.assertNotSelected('all');
        filter.assertSelected('active');
        filter.assertNotSelected('completed');
      });

      it('should show only active todos when active filter is selected', () => {
        filter.link('active').click();

        todos.assertCount(2);
        todos.assertTitle(0, 'TypeScript');
        todos.assertTitle(1, 'React');
      });

      it('should keep footer when active todos are shown', () => {
        filter.link('active').click();

        page.todosCounter().should('have.text', '2 items left');
        filter.assertVisible();
        page.clearCompletedButton().should('exist');
      });

      it('should allow to select the completed filter', () => {
        filter.link('completed').click();

        filter.assertNotSelected('all');
        filter.assertNotSelected('active');
        filter.assertSelected('completed');
      });

      it('should show only completed todos when completed filter is selected', () => {
        filter.link('completed').click();

        todos.assertCount(3);
        todos.assertTitle(0, 'HTML');
        todos.assertTitle(1, 'CSS');
        todos.assertTitle(2, 'JS');
      });

      it('should keep footer when completed todos are shown', () => {
        filter.link('completed').click();

        page.todosCounter().should('have.text', '2 items left');
        filter.assertVisible();
        page.clearCompletedButton().should('exist');
      });

      it('should allow to reset filter', () => {
        filter.link('completed').click();
        filter.link('all').click();

        todos.assertCount(5);
        filter.assertSelected('all');
        filter.assertNotSelected('active');
        filter.assertNotSelected('completed');
      });
    });

    describe('with active todos only', () => {
      beforeEach(() => {
        cy.fixture('active-todos').then(page.visit);
      });

      it('should hide todos on completed selection', () => {
        filter.link('completed').click();

        todos.assertCount(0);
      });

      it('should keep footer on completed selection', () => {
        filter.link('completed').click();
        filter.assertVisible();
      });

      it('should keep todos counter on completed selection', () => {
        filter.link('completed').click();
        page.todosCounter().should('have.text', '5 items left');
      });
    });

    describe('with completed todos only', () => {
      beforeEach(() => {
        cy.fixture('completed-todos').then(page.visit);
      });

      it('should hide todos on active selection', () => {
        filter.link('active').click();

        todos.assertCount(0);
      });

      it('should keep footer on active selection', () => {
        filter.link('active').click();
        filter.assertVisible();
      });

      it('should keep todos counter on active selection', () => {
        filter.link('active').click();
        page.todosCounter().should('have.text', '0 items left');
      });
    });
  });

  describe('Adding a todo', () => {
    beforeEach(() => {
      cy.fixture('todos').then(page.visit);
    });

    it('should focus text field by default', () => {
      page.newTodoField().should('be.focused');
    });

    it('should keep text field focused if title is empty', () => {
      page.newTodoField().type('{enter}');

      page.newTodoField().should('be.focused');
    });

    it('should keep text field focused if title title has only whitespaces', () => {
      page.newTodoField().type('     {enter}');
      page.newTodoField().should('be.focused');
    });

    it('should add an active todo', () => {
      page.newTodoField().type('Test Todo{enter}');

      todos.assertCount(6);
      todos.assertTitle(5, 'Test Todo');
      todos.assertNotCompleted(5);
    });

    it('should save updated todos to localStorage', () => {
      page.newTodoField().type('Test Todo{enter}');

      page.data().then(todos => {
        expect(todos).to.have.length(6);
        expect(todos[5].title).to.equal('Test Todo');
        expect(todos[5].completed).to.be.false;
      });
    });

    it('should update active counter', () => {
      page.newTodoField().type('Test Todo{enter}');

      page.todosCounter().should('have.text', '3 items left');
    });

    it('should clear text field', () => {
      page.newTodoField().type('Test Todo{enter}');

      page.newTodoField().should('have.value', '');
    });

    it('should focus text field', () => {
      page.newTodoField().type('Test Todo{enter}');

      page.newTodoField().should('be.focused');
    });

    it('should allow to add one more todo', () => {
      page.newTodoField().type('Test Todo{enter}');
      page.newTodoField().type('Hello world{enter}');

      todos.assertCount(7);
      todos.assertNotCompleted(6);
      todos.assertTitle(6, 'Hello world');
      page.todosCounter().should('have.text', '4 items left');
    });

    it('should save all added todos to localStorage', () => {
      page.newTodoField().type('Test Todo{enter}');
      page.newTodoField().type('Hello world{enter}');

      page.data().then(todos => {
        expect(todos).to.have.length(7);
        expect(todos[6].title).to.equal('Hello world');
        expect(todos[6].completed).to.be.false;
      });
    });

    it('should add trimmed title', () => {
      page.newTodoField().type('  Other Title    {enter}');

      todos.assertTitle(5, 'Other Title');
    });

    it('should keep current filter', () => {
      filter.link('active').click();
      page.newTodoField().type('Test Todo{enter}');

      filter.assertSelected('active');
    });
  });

  describe('Individual Todo Deletion', () => {
    describe('in the list with many todos', () => {
      beforeEach(() => {
        cy.fixture('todos').then(page.visit);
      });

      it('should remove the todo from the list', () => {
        todos.deleteButton(0).click();

        todos.assertCount(4);
        todos.assertTitle(0, 'CSS');
      });

      it('should save all changes to localStorage', () => {
        todos.deleteButton(0).click();

        page.data().then(todos => {
          expect(todos).to.have.length(4);
          expect(todos[0].title).to.equal('CSS');
        });
      });

      it('should focus text field after todo deletion', () => {
        todos.deleteButton(0).click();

        page.newTodoField().should('be.focused');
      });

      it('should keep active todos count if completed todo is deleted', () => {
        todos.deleteButton(0).click();

        page.todosCounter().should('have.text', '2 items left');
      });

      it('should adjust active todos count if active todo is deleted', () => {
        todos.deleteButton(4).click();

        page.todosCounter().should('contain.text', '1 item');
      });
    });

    describe('for the last todo in the list', () => {
      beforeEach(() => {
        page.visit([{ id: 42, title: 'HTML', completed: false }]);

        todos.deleteButton(0).click();
      });

      it('should hide todos', () => {
        todos.assertCount(0);
      });

      it('should hide footer', () => {
        filter.assertHidden();
        page.clearCompletedButton().should('not.exist');
        page.todosCounter().should('not.exist');
      });

      it('should focus text field after todo deletion', () => {
        page.newTodoField().should('be.focused');
      });

      it('should hide ToggleAllButton', () => {
        page.toggleAllButton().should('not.exist');
      });

      it('should save an empty array to localStorage', () => {
        page.data().should('deep.equal', []);
      });
    });
  });

  describe('ClearCompleted button', () => {
    describe('with no completed todos', () => {
      beforeEach(() => {
        cy.fixture('active-todos').then(page.visit);
      });

      it('should be disabled', () => {
        page.clearCompletedButton().should('be.disabled');
      });
    });

    describe('with some completed todos', () => {
      beforeEach(() => {
        cy.fixture('todos').then(page.visit);
      });

      it('should be enabled', () => {
        page.clearCompletedButton().should('not.be.disabled');
      });

      it('should remove all completed todos from the list', () => {
        page.clearCompletedButton().click();

        todos.assertCount(2);
        todos.assertTitle(0, 'TypeScript');
        todos.assertTitle(1, 'React');
      });

      it('should save all changes to localStorage', () => {
        page.clearCompletedButton().click();

        page.data().then(todos => {
          expect(todos).to.have.length(2);
          expect(todos[0].title).to.equal('TypeScript');
          expect(todos[0].completed).to.be.false;
          expect(todos[1].title).to.equal('React');
          expect(todos[1].completed).to.be.false;
        });
      });

      it('should become disabled after deletion', () => {
        page.clearCompletedButton().click();

        page.clearCompletedButton().should('be.disabled');
      });

      it('should focus new todo field after deletion', () => {
        page.clearCompletedButton().click();

        page.newTodoField().should('be.focused');
      });
    });

    describe('if all todos are completed', () => {
      beforeEach(() => {
        cy.fixture('completed-todos').then(page.visit);
        page.clearCompletedButton().click();
      });

      it('should hide todos after clearing all completed todos', () => {
        todos.assertCount(0);
      });

      it('should save an empty array to localStorage', () => {
        page.data().should('deep.equal', []);
      });

      it('should hide footer after clearing all completed todos', () => {
        filter.assertHidden();
        page.clearCompletedButton().should('not.exist');
        page.todosCounter().should('not.exist');
      });
    });
  });

  describe('Todo Toggler', () => {
    beforeEach(() => {
      cy.fixture('todos').then(page.visit);
    });

    describe('', () => {
      beforeEach(() => {
        todos.statusToggler(0).click();
      });

      it('should toggle a todo', () => {
        todos.assertNotCompleted(0);
        todos.statusToggler(0).should('not.be.checked');
      });

      it('should save changes to localStorage', () => {
        page.data().then(todos => {
          expect(todos).to.have.length(5);
          expect(todos[0].title).to.equal('HTML');
          expect(todos[0].completed).to.be.false;
        });
      });

      it('should update the counter', () => {
        page.todosCounter().should('have.text', '3 items left');
      });
    });

    describe('if filtered', () => {
      beforeEach(() => {
        filter.link('completed').click();
        todos.statusToggler(0).click();
      });

      it('should hide a todo', () => {
        todos.assertCount(2);
        todos.assertTitle(0, 'CSS');
      });

      it('should show a todo after selecting an oposite filter', () => {
        filter.link('active').click();

        todos.assertCount(3);
        todos.assertTitle(0, 'HTML');
      });
    });
  });

  describe('Toggle All Button', () => {
    describe('if all todos are completed', () => {
      beforeEach(() => {
        cy.fixture('completed-todos').then(page.visit);
      });

      it('should be active', () => {
        page.toggleAllButton().should('have.class', 'active');
      });

      it('should stay active after filtering out all the todos', () => {
        filter.link('active').click();

        page.toggleAllButton().should('have.class', 'active');
      });

      it('should become not active after toggling a todo', () => {
        todos.statusToggler(1).click();

        page.toggleAllButton().should('not.have.class', 'active');
      });

      it('should make all todos active on click', () => {
        page.toggleAllButton().click();

        todos.assertNotCompleted(0);
        todos.assertNotCompleted(1);
        todos.assertNotCompleted(2);
        todos.assertNotCompleted(3);
        todos.assertNotCompleted(4);
      });

      it('should save changes to localStorage', () => {
        page.toggleAllButton().click();

        page.data().then(todos => {
          expect(todos).to.have.length(5);
          expect(todos[0].completed).to.be.false;
          expect(todos[1].completed).to.be.false;
          expect(todos[2].completed).to.be.false;
          expect(todos[3].completed).to.be.false;
          expect(todos[4].completed).to.be.false;
        });
      });

      it('should become not active on click', () => {
        page.toggleAllButton().click();

        page.toggleAllButton().should('not.have.class', 'active');
      });
    });

    describe('if all todos are active', () => {
      beforeEach(() => {
        cy.fixture('active-todos').then(page.visit);
      });

      it('should not be active', () => {
        page.toggleAllButton().should('not.have.class', 'active');
      });

      it('should not become active after toggling a todo', () => {
        todos.statusToggler(1).click();

        page.toggleAllButton().should('not.have.class', 'active');
      });

      it('should make all todos completed on click', () => {
        page.toggleAllButton().click();

        todos.assertCompleted(0);
        todos.assertCompleted(1);
        todos.assertCompleted(2);
        todos.assertCompleted(3);
        todos.assertCompleted(4);
      });

      it('should save changes to localStorage', () => {
        page.toggleAllButton().click();

        page.data().then(todos => {
          expect(todos).to.have.length(5);
          expect(todos[0].completed).to.be.true;
          expect(todos[1].completed).to.be.true;
          expect(todos[2].completed).to.be.true;
          expect(todos[3].completed).to.be.true;
          expect(todos[4].completed).to.be.true;
        });
      });

      it('should become active on click', () => {
        page.toggleAllButton().click();

        page.toggleAllButton().should('have.class', 'active');
      });
    });

    describe('if there are some mixed todos', () => {
      beforeEach(() => {
        cy.fixture('todos').then(page.visit);
      });

      it('should not be active', () => {
        page.toggleAllButton().should('not.have.class', 'active');
      });

      it('should become active after completing all todos', () => {
        todos.statusToggler(3).click();
        todos.statusToggler(4).click();

        page.toggleAllButton().should('have.class', 'active');
      });

      it('should make all todos completed on click', () => {
        page.toggleAllButton().click();

        todos.assertCompleted(0);
        todos.assertCompleted(1);
        todos.assertCompleted(2);
        todos.assertCompleted(3);
        todos.assertCompleted(4);
      });

      it('should save changes to localStorage', () => {
        page.toggleAllButton().click();

        page.data().then(todos => {
          expect(todos).to.have.length(5);
          expect(todos[0].completed).to.be.true;
          expect(todos[1].completed).to.be.true;
          expect(todos[2].completed).to.be.true;
          expect(todos[3].completed).to.be.true;
          expect(todos[4].completed).to.be.true;
        });
      });

      it('should become active on click', () => {
        page.toggleAllButton().click();

        page.toggleAllButton().should('have.class', 'active');
      });
    });
  });

  describe('Renaming Form', () => {
    beforeEach(() => {
      cy.fixture('todos').then(page.visit);
      todos.title(0).trigger('dblclick');
    });

    describe('', () => {
      it('should be opened on dblclick', () => {
        todos.titleField(0).should('exist');
      });

      it('should have current value', () => {
        todos.titleField(0).should('have.value', 'HTML');
      });

      it('should be focused', () => {
        todos.titleField(0).should('be.focused');
      });

      it('should hide a title', () => {
        todos.title(0).should('not.exist');
      });

      it('should hide DeleteButton', () => {
        todos.deleteButton(0).should('not.exist');
      });

      it('should keep StatusToggler', () => {
        todos.statusToggler(0).should('exist');
      });

      it('should not open forms for other todos', () => {
        todos.titleField(1).should('not.exist');
        todos.titleField(2).should('not.exist');
        todos.titleField(3).should('not.exist');
        todos.titleField(4).should('not.exist');
      });
    });

    describe('if title was changed', () => {
      beforeEach(() => {
        todos.titleField(0).clear();
      });

      describe('on Enter', () => {
        it('should be closed', () => {
          todos.titleField(0).type('123{enter}');

          todos.titleField(0).should('not.exist');
        });

        it('should show the updated title on Enter', () => {
          todos.titleField(0).type('Something{enter}');

          todos.assertTitle(0, 'Something');
        });

        it('should trim the new title on Enter', () => {
          todos.titleField(0).type('   Some new title      {enter}');

          todos.assertTitle(0, 'Some new title');
        });

        it('should save changes to localStorage', () => {
          todos.titleField(0).type('   Some new title      {enter}');

          page.data().then(todos => {
            expect(todos).to.have.length(5);
            expect(todos[0].title).to.equal('Some new title');
          });
        });
      });

      describe('on Escape', () => {
        it('should be closed', () => {
          todos.titleField(0).type('123{esc}');

          todos.titleField(0).should('not.exist');
        });

        it('should keep old title', () => {
          todos.titleField(0).type('Something{esc}');

          todos.assertTitle(0, 'HTML');
        });
      });

      describe('on blur', () => {
        it('should save', () => {
          todos.titleField(0).type('Something');
          todos.titleField(0).blur();

          todos.titleField(0).should('not.exist');
          todos.assertTitle(0, 'Something');
        });

        it('should save trimmed title', () => {
          todos.titleField(0).type('   Some new title      ');
          todos.titleField(0).blur();

          todos.assertTitle(0, 'Some new title');
        });

        it('should save changes to localStorage', () => {
          todos.titleField(0).type('   Some new title      ');
          todos.titleField(0).blur();

          page.data().then(todos => {
            expect(todos).to.have.length(5);
            expect(todos[0].title).to.equal('Some new title');
          });
        });
      });
    });

    describe('if title was not changed', () => {
      it('should be close on Enter', () => {
        todos.titleField(0).type('{enter}');

        todos.titleField(0).should('not.exist');
      });

      it('should preserve current title on Enter', () => {
        todos.titleField(0).type('{enter}');

        todos.assertTitle(0, 'HTML');
      });

      it('should be closed on Escape', () => {
        todos.titleField(0).type('{esc}');

        todos.titleField(0).should('not.exist');
      });

      it('should preserve current title on Escape', () => {
        todos.titleField(0).type('{esc}');

        todos.assertTitle(0, 'HTML');
      });

      it('should save on blur', () => {
        todos.titleField(0).clear();
        todos.titleField(0).type('Something');
        todos.titleField(0).blur();

        todos.titleField(0).should('not.exist');
        todos.assertTitle(0, 'Something');
      });
    });

    describe('if title became empty', () => {
      beforeEach(() => {
        todos.titleField(0).clear();
      });

      describe('on Enter', () => {
        it('should delete a todo', () => {
          todos.titleField(0).type('{enter}');

          todos.assertCount(4);
          todos.assertTitle(0, 'CSS');
        });

        it('should save changes to localStorage', () => {
          todos.titleField(0).type('{enter}');

          page.data().then(todos => {
            expect(todos).to.have.length(4);
            expect(todos[0].title).to.equal('CSS');
          });
        });
      });

      describe('on Escape', () => {
        it('should be closed', () => {
          todos.titleField(0).type('{esc}');

          todos.titleField(0).should('not.exist');
        });

        it('should preserve todos', () => {
          todos.titleField(0).type('{esc}');

          todos.assertCount(5);
        });

        it('should preserve current title', () => {
          todos.titleField(0).type('{esc}');

          todos.title(0).should('have.text', 'HTML');
        });
      });

      describe('on blur', () => {
        it('should delete a todo', () => {
          todos.titleField(0).blur();

          todos.assertCount(4);
          todos.assertTitle(0, 'CSS');
        });

        it('should save changes to localStorage', () => {
          todos.titleField(0).blur();

          page.data().then(todos => {
            expect(todos).to.have.length(4);
            expect(todos[0].title).to.equal('CSS');
          });
        });
      });
    });
  });
});
