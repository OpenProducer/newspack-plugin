/**
 * "Components Demo" Wizard.
 */

/**
 * WordPress dependencies
 */
import { Component, Fragment, render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	ActionCard,
	ImageUpload,
	CheckboxControl,
	Card,
	Button,
	FormattedHeader,
	TextControl,
	PluginInstaller,
	ProgressBar,
	Checklist,
	Task,
	SelectControl,
	Modal,
	Wizard,
	WizardScreen,
} from '../../components/src';
import './style.scss';

/**
 * Components demo for example purposes.
 */
class ComponentsDemo extends Component {
	/**
	 * constructor. Demo of how the parent interacts with the components, and controls their values.
	 */
	constructor() {
		super( ...arguments );
		this.state = {
			checklistProgress: 0,
			inputTextValue1: 'Input value',
			inputTextValue2: '',
			inputNumValue: 0,
			image: null,
			selectValue1: '2nd',
			selectValue2: '',
			modalShown: false,
		};
	}

	performCheckListItem = index => {
		const { checklistProgress } = this.state;
		console.log( 'Perform checklist item: ' + index );
		this.setState( { checklistProgress: Math.max( checklistProgress, index + 1 ) } );
	};

	dismissCheckListItem = index => {
		const { checklistProgress } = this.state;
		console.log( 'Skip checklist item: ' + index );
		this.setState( { checklistProgress: Math.max( checklistProgress, index + 1 ) } );
	};

	/**
	 * Render the example stub.
	 */
	render() {
		const {
			checklistProgress,
			inputTextValue1,
			inputTextValue2,
			inputNumValue,
			selectValue1,
			selectValue2,
			modalShown,
		} = this.state;

		return (
			<Fragment>
				<FormattedHeader
					headerText={ __( 'Newspack Components' ) }
					subHeaderText={ __( 'Temporary demo of Newspack components' ) }
				/>
				<Wizard
					requiredPlugins={ [ 'jetpack' ] }
					requiredPluginsCancelText={ __( 'Back to checklist' ) }
					onRequiredPluginsCancel={ () => console.log( 'Checklist' ) }
				>
					<WizardScreen
						path='/test-wizard-1'
						completeButtonText={ __( 'Continue to 2' ) }
						subCompleteButtonText={ __( 'Back to checklist' ) }
						onSubCompleteButtonClicked={ () => console.log( 'Checklist' ) }
						next='test-wizard-2'
					>
						<FormattedHeader
							headerText={ __( 'WizardScreen Component 1' ) }
							subHeaderText={ __( 'This is #1 wizard screen' ) }
						/>
					</WizardScreen>
					<WizardScreen
						path='/test-wizard-2'
						completeButtonText={ __( 'Continue to 3' ) }
						subCompleteButtonText={ __( 'Back to 1' ) }
						onSubCompleteButtonClicked={ () => this.setState( { activeWizardScreen: 'test-wizard-1' } ) }
						next='test-wizard-3'
					>
						<FormattedHeader
							headerText={ __( 'WizardScreen Component 2' ) }
							subHeaderText={ __( 'This is #2 wizard screen' ) }
						/>
					</WizardScreen>
					<WizardScreen
						noBackground
						path='/test-wizard-3'
						completeButtonText={ __( 'Finish' ) }
						next='/'
					>
						<FormattedHeader
							headerText={ __( 'WizardScreen Component 3' ) }
							subHeaderText={ __( 'This is #3 wizard screen' ) }
						/>
					</WizardScreen>
				</Wizard>
				<hr/>
				<Card>
					<FormattedHeader
						headerText={ __( 'Notice/Modal' ) }
					/>
					<Button className="is-centered" isTertiary onClick={ () => this.setState( { modalShown: true } ) } >
						{ __( 'Open modal' ) }
					</Button>
					{ modalShown && (
						<Modal
							title="This is the modal title"
							onRequestClose={ () => this.setState( { modalShown: false } ) }
						>
							<p>{ __( 'Based on industry research, we advise to test the modal component, and continuing this sentence so we can see how the text wraps is one good way of doing that.' ) }</p>
							<Button isPrimary onClick={ () => this.setState( { modalShown: false } ) } >
								{ __( 'Dismiss' ) }
							</Button>
							<Button isDefault onClick={ () => this.setState( { modalShown: false } ) } >
								{ __( 'Also dismiss' ) }
							</Button>
						</Modal>
					) }
				</Card>
				<Card noBackground>
					<FormattedHeader
						headerText={ __( 'Plugin installer' ) }
					/>
					<PluginInstaller
						plugins={ [ 'woocommerce', 'amp', 'wordpress-seo', 'fake-plugin' ] }
						canUninstall
					/>
				</Card>
				<Card noBackground>
					<PluginInstaller
						plugins={ [ 'woocommerce', 'amp', 'wordpress-seo' ] }
						onComplete={ pluginInfo => {
							console.log( 'All plugins installed successfully', pluginInfo );
						} }
					/>
				</Card>
				<FormattedHeader
					headerText={ __( 'Action cards' ) }
				/>
				<ActionCard
					title="Example One"
					description="Has an action button."
					actionText="Install"
					onClick={ () => {
						console.log( 'Install clicked' );
					} }
				/>
				<ActionCard
					title="Example Two"
					description="Has action button and secondary button (visible on hover)."
					actionText={ __( 'Edit' ) }
					secondaryActionText={ __( 'Delete' ) }
					onClick={ () => {
						console.log( 'Edit clicked' );
					} }
					onSecondaryActionClick={ () => {
						console.log( 'Delete clicked' );
					} }
				/>
				<ActionCard
					title="Example Three"
					description="Waiting/in-progress state, no action button."
					actionText="Installing..."
					isWaiting
				/>
				<ActionCard
					title="Example Four"
					description="Error notification"
					actionText="Install"
					onClick={ () => {
						console.log( 'Install clicked' );
					} }
					notification={
						<Fragment>
							Plugin cannot be installed <a href="#">Retry</a> | <a href="#">Documentation</a>
						</Fragment>
					}
					notificationLevel="error"
				/>
				<ActionCard
					title="Example Five"
					description="Warning notification, action button"
					notification={
						<Fragment>
							There is a new version available. <a href="#">View details</a> or{' '}
							<a href="#">update now</a>
						</Fragment>
					}
					notificationLevel="warning"
				/>
				<ActionCard title="Example Six" description="Static text, no button" actionText="Active" />
				<ActionCard
					title="Example Seven"
					description="Static text, secondary action button."
					actionText="Active"
					secondaryActionText={ __( 'Delete' ) }
					onSecondaryActionClick={ () => {
						console.log( 'Delete clicked' );
					} }
				/>
				<ActionCard
					title="Example Eight"
					description="Image with link and action button."
					actionText="Set Up"
					onClick={ () => {
						console.log( 'Set Up' );
					} }
					image="//s1.wp.com/wp-content/themes/h4/landing/marketing/pages/hp-jan-2019/media/man-with-shadow.jpg"
					imageLink="https://wordpress.com"
				/>
				<FormattedHeader
					headerText={ __( 'Checklist' ) }
				/>
				<Checklist progressBarText={ __( 'Your setup list' ) }>
					<Task
						title={ __( 'Set up membership' ) }
						description={ __(
							"Optimize your site for search engines and social media by taking advantage of our SEO tools. We'll walk you through important SEO strategies to get more exposure for your business."
						) }
						buttonText={ __( 'Do it' ) }
						completedTitle={ __( 'All set!' ) }
						active={ checklistProgress === 0 }
						completed={ checklistProgress > 0 }
						onClick={ () => this.performCheckListItem( 0 ) }
						onDismiss={ () => this.dismissCheckListItem( 0 ) }
					/>
					<Task
						title={ __( 'Set up your paywall' ) }
						description={ __(
							"Optimize your site for search engines and social media by taking advantage of our SEO tools. We'll walk you through important SEO strategies to get more exposure for your business."
						) }
						buttonText={ __( 'Do it' ) }
						completedTitle={ __( 'All set!' ) }
						active={ checklistProgress === 1 }
						completed={ checklistProgress > 1 }
						onClick={ () => this.performCheckListItem( 1 ) }
						onDismiss={ () => this.dismissCheckListItem( 1 ) }
					/>
					<Task
						title={ __( 'Customize your donations page' ) }
						description={ __(
							"Optimize your site for search engines and social media by taking advantage of our SEO tools. We'll walk you through important SEO strategies to get more exposure for your business."
						) }
						buttonText={ __( 'Do it' ) }
						completedTitle={ __( 'All set!' ) }
						active={ checklistProgress === 2 }
						completed={ checklistProgress > 2 }
						onClick={ () => this.performCheckListItem( 2 ) }
						onDismiss={ () => this.dismissCheckListItem( 2 ) }
					/>
					<Task
						title={ __( 'Setup Call to Action block' ) }
						description={ __(
							"Optimize your site for search engines and social media by taking advantage of our SEO tools. We'll walk you through important SEO strategies to get more exposure for your business."
						) }
						buttonText={ __( 'Do it' ) }
						completedTitle={ __( 'All set!' ) }
						active={ checklistProgress === 3 }
						completed={ checklistProgress > 3 }
						onClick={ () => this.performCheckListItem( 3 ) }
						onDismiss={ () => this.dismissCheckListItem( 3 ) }
					/>
				</Checklist>
				<Card>
					<FormattedHeader headerText={ __( 'Checkboxes' ) } />
					<CheckboxControl
						label={ __( 'Checkbox is tested?' ) }
						onChange={ function() {
							console.log( "Yep, it's tested" );
						} }
					/>
					<CheckboxControl
						label={ __( 'Checkbox w/Tooltip' ) }
						onChange={ function() {
							console.log( "Yep, it's tested" );
						} }
						tooltip="This is tooltip text"
					/>
					<CheckboxControl
						label={ __( 'Checkbox w/Help' ) }
						onChange={ function() {
							console.log( "Yep, it's tested" );
						} }
						help="This is help text"
					/>
				</Card>
				<Card>
					<FormattedHeader headerText={ __( 'Image Uploader' ) } />
					<ImageUpload
						image={ this.state.image }
						onChange={ image => {
							this.setState( { image } );
							console.log( 'Image:' );
							console.log( image );
						} }
					/>
				</Card>
				<Card>
					<FormattedHeader headerText={ __( 'Text Inputs' ) } />
					<TextControl
						label={ __( 'Text Input with value' ) }
						value={ inputTextValue1 }
						onChange={ value => this.setState( { inputTextValue1: value } ) }
					/>
					<TextControl
						label={ __( 'Text Input empty' ) }
						value={ inputTextValue2 }
						onChange={ value => this.setState( { inputTextValue2: value } ) }
					/>
					<TextControl
						type="number"
						label={ __( 'Number Input' ) }
						value={ inputNumValue }
						onChange={ value => this.setState( { inputNumValue: value } ) }
					/>
					<TextControl label={ __( 'Text Input disabled' ) } disabled />
				</Card>
				<Card>
					<FormattedHeader headerText={ __( 'Progress bar' ) } />
					<ProgressBar completed="2" total="3" />
					<ProgressBar completed="2" total="5" label={ __( 'Progress made' ) } />
					<ProgressBar completed="0" total="5" displayFraction />
					<ProgressBar completed="3" total="8" label={ __( 'Progress made' ) } displayFraction />
				</Card>
				<Card>
					<FormattedHeader headerText="Select dropdowns" />
					<SelectControl
						label="Select with value"
						value={ selectValue1 }
						options={ [
							{ value: '1st', label: 'First' },
							{ value: '2nd', label: 'Second' },
							{ value: '3rd', label: 'Third' },
						] }
						value={ selectValue1 }
						onChange={ value => this.setState( { selectValue1: value } ) }
					/>
					<SelectControl
						label="Select empty"
						value={ selectValue2 }
						options={ [
							{ value: '1st', label: 'First' },
							{ value: '2nd', label: 'Second' },
							{ value: '3rd', label: 'Third' },
						] }
						onChange={ value => this.setState( { selectValue2: value } ) }
					/>
					<SelectControl
						label="Select disabled"
						disabled
						options={ [
							{ value: '1st', label: 'First' },
							{ value: '2nd', label: 'Second' },
							{ value: '3rd', label: 'Third' },
						] }
					/>
				</Card>
				<Card>
					<FormattedHeader headerText="Buttons" />
					<Button isPrimary className="is-centered">
						Continue
					</Button>
					<Button isDefault className="is-centered">
						Continue
					</Button>
					<Button isTertiary className="is-centered">
						Continue
					</Button>
					<Button isPrimary>Continue</Button>
					<Button isDefault>Continue</Button>
					<Button isTertiary>Continue</Button>
				</Card>
			</Fragment>
		);
	}
}

render( <ComponentsDemo />, document.getElementById( 'newspack-components-demo' ) );
